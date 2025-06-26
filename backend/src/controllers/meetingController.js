import db from '../db.js';

export const findAll = (req, res) => {
  const query = `
    SELECT 
      Atende.id_medico,
      Medico.nome AS nome_medico,
      Medico.especialidade AS medico_especialidade,
      Atende.id_paciente,
      Paciente.nome AS nome_paciente,
      Prescricao.data_emissao,
      Medicamento.nome AS nome_medicamento,
      Saida_Medicamento.quantidade_retirada,
      Saida_Medicamento.lote
    FROM Atende
    JOIN Medico ON Atende.id_medico = Medico.id
    JOIN Paciente ON Atende.id_paciente = Paciente.id
    LEFT JOIN Prescricao ON Prescricao.id_atende = Atende.id
    LEFT JOIN Gera ON Gera.id_prescricao = Prescricao.id
    LEFT JOIN Saida_Medicamento ON Saida_Medicamento.id = Gera.id_saida_medicamento
    LEFT JOIN Medicamento ON Medicamento.id = Saida_Medicamento.id_medicamento
    WHERE Prescricao.data_emissao = (
      SELECT MAX(p2.data_emissao)
      FROM Prescricao p2
      WHERE p2.id_atende = Atende.id
    )
  `;

  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    } else {
      return res.send(rows);
    }
  });
};

export const create = (req, res) => {
  const { id_medico, id_paciente, id_medicamento, quantidade, lote } = req.body;

  db.run(
    'INSERT INTO Atende (id_medico, id_paciente) VALUES (?, ?)',
    [id_medico, id_paciente],
    function (err) {
      if (err) return res.status(500).send({ error: err.message });

      const id_atende = this.lastID;

      db.run(
        'UPDATE Estoque SET quantidade = quantidade - ? WHERE id_medicamento = ?',
        [quantidade, id_medicamento],
        function (err2) {
          if (err2) return res.status(500).send({ error: err2.message });

          db.run(
            'INSERT INTO Saida_Medicamento (data_movimentacao, quantidade_retirada, id_medicamento, lote) VALUES (?, ?, ?, ?)',
            [new Date(), quantidade, id_medicamento, lote],
            function (err3) {
              if (err3) return res.status(500).send({ error: err3.message });

              const id_saida_medicamento = this.lastID;

              db.run(
                'INSERT INTO Prescricao (data_emissao, id_medico, id_paciente, id_atende) VALUES (?, ?, ?, ?)',
                [new Date(), id_medico, id_paciente, id_atende],
                function (err4) {
                  if (err4) return res.status(500).send({ error: err4.message });

                  const id_prescricao = this.lastID;

                  db.run(
                    'INSERT INTO Gera (id_saida_medicamento, id_prescricao) VALUES (?, ?)',
                    [id_saida_medicamento, id_prescricao],
                    function (err5) {
                      if (err5) return res.status(500).send({ error: err5.message });

                      return res.status(201).send({ message: 'Atendimento criado e estoque atualizado com sucesso' });
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
};

export const update = (req, res) => {
  const { id } = req.params;
  const { id_medico, id_paciente } = req.body;

  db.run(
    'UPDATE Atende SET id_medico = ?, id_paciente = ? WHERE id = ?',
    [id_medico, id_paciente, id],
    function (err) {
      if (err) {
        res.status(500).send({ error: err.message });
      } else {
        res.send({ message: 'Atendimento atualizado com sucesso' });
      }
    }
  );
};
