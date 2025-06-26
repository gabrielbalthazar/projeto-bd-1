import db from '../db.js';

export const findAll = (req, res) => {
  db.all('SELECT * FROM Medicamento', (err, rows) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.send(rows);
    }
  });
};

export const findOne = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM Medicamento WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else if (row) {
      res.send(row);
    } else {
      res.status(404).send({ error: 'Medicamento não encontrado' });
    }
  });
};

export const create = (req, res) => {
  const {
    nome,
    dosagem,
    principio_ativo,
    data_validade,
    lote,
    quantidade,
    codigo_lote_chave_parcial
  } = req.body;

  db.run(
    'INSERT INTO Medicamento (nome, dosagem, principio_ativo, data_validade) VALUES (?, ?, ?, ?)',
    [nome, dosagem, principio_ativo, data_validade],
    function (err) {
      if (err) {
        res.status(500).send({ error: err.message });
      } else {
        const id_medicamento = this.lastID;

        db.run(
          'INSERT INTO Estoque (lote, id_medicamento, quantidade, codigo_lote_chave_parcial) VALUES (?, ?, ?, ?)',
          [lote, id_medicamento, quantidade, codigo_lote_chave_parcial],
          function (err2) {
            if (err2) {
              res.status(500).send({ error: err2.message });
            } else {
              res.status(201).send({
                message: 'Medicamento e estoque criados com sucesso',
                id_medicamento: id_medicamento
              });
            }
          }
        );
      }
    }
  );
};

export const update = (req, res) => {
  const { id_medicamento } = req.body;
  const { nome, dosagem, principio_ativo, data_validade, lote, codigo_lote_chave_parcial, quantidade } = req.body;
  db.run(
    'UPDATE Medicamento SET nome = ?, dosagem = ?, principio_ativo = ?, data_validade = ? WHERE id = ?',
    [nome, dosagem, principio_ativo, data_validade, id_medicamento],
    function (err) {
      if (err) {
        res.status(500).send({ error: err.message });
      }
      
      db.run(
        'UPDATE Estoque SET lote = ?, codigo_lote_chave_parcial = ?, quantidade = ? WHERE id_medicamento = ?',
        [lote, codigo_lote_chave_parcial, quantidade, id_medicamento],
        function (err2) {
          if (err2) {
            res.status(500).send({ error: err2.message });
          }
        }
      );
    }
  );
};

// Medicamento → Saida_Medicamento → Gera → Prescricao → Atende
export const remove = (req, res) => {
  const { id } = req.params; // id do Medicamento

  db.all('SELECT id FROM Saida_Medicamento WHERE id_medicamento = ?', [id], (err, saidas) => {
    if (err) return res.status(500).send({ error: err.message });

    const saidaIds = saidas.map(s => s.id);
    if (saidaIds.length === 0) {
      return removerEstoqueEMedicamento(id, res);
    }

    const placeholdersSaidas = saidaIds.map(() => '?').join(',');

    db.all(`SELECT id_prescricao FROM Gera WHERE id_saida_medicamento IN (${placeholdersSaidas})`, saidaIds, (err2, prescs) => {
      if (err2) return res.status(500).send({ error: err2.message });

      const prescricaoIds = prescs.map(p => p.id_prescricao);
      if (prescricaoIds.length === 0) {
        return removerEstoqueEMedicamento(id, res);
      }

      const placeholdersPresc = prescricaoIds.map(() => '?').join(',');

      db.all(`SELECT DISTINCT id_atende FROM Prescricao WHERE id IN (${placeholdersPresc}) AND id_atende IS NOT NULL`, prescricaoIds, (err3, rowsAtende) => {
        if (err3) return res.status(500).send({ error: err3.message });

        const atendeIds = rowsAtende.map(row => row.id_atende).filter(Boolean);
        const placeholdersAtende = atendeIds.map(() => '?').join(',');

        db.run(`DELETE FROM Gera WHERE id_saida_medicamento IN (${placeholdersSaidas})`, saidaIds, function (err4) {
          if (err4) return res.status(500).send({ error: err4.message });

          db.run(`DELETE FROM Saida_Medicamento WHERE id IN (${placeholdersSaidas})`, saidaIds, function (err5) {
            if (err5) return res.status(500).send({ error: err5.message });

            db.run(`DELETE FROM Prescricao WHERE id IN (${placeholdersPresc})`, prescricaoIds, function (err6) {
              if (err6) return res.status(500).send({ error: err6.message });

              if (atendeIds.length > 0) {
                db.run(`DELETE FROM Atende WHERE id IN (${placeholdersAtende})`, atendeIds, function (err7) {
                  if (err7) return res.status(500).send({ error: err7.message });

                  removerEstoqueEMedicamento(id, res);
                });
              } else {
                removerEstoqueEMedicamento(id, res);
              }
            });
          });
        });
      });
    });
  });
};

function removerEstoqueEMedicamento(id, res) {
  db.run('DELETE FROM Estoque WHERE id_medicamento = ?', [id], function (err1) {
    if (err1) return res.status(500).send({ error: err1.message });

    db.run('DELETE FROM Medicamento WHERE id = ?', [id], function (err2) {
      if (err2) return res.status(500).send({ error: err2.message });

      res.send({ message: 'Medicamento, consultas e dependências removidas com sucesso.' });
    });
  });
}