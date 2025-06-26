import db from '../db.js';

export const findAll = (req, res) => {
  const query = `
    SELECT 
      Estoque.lote,
      Estoque.id_medicamento,
      Medicamento.nome AS nome_medicamento,
      Medicamento.data_validade AS data_validade,
      Medicamento.principio_ativo AS principio_ativo,
      Medicamento.dosagem AS dosagem,
      Estoque.quantidade,
      Estoque.codigo_lote_chave_parcial
    FROM Estoque
    JOIN Medicamento ON Estoque.id_medicamento = Medicamento.id
  `;

  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.send(rows);
    }
  });
};

export const findOne = (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM Estoque WHERE id_medicamento = ?', [id], (err, row) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else if (!row) {
      res.status(404).send({ message: 'Estoque não encontrado' });
    } else {
      res.send(row);
    }
  });
};

export const create = (req, res) => {
  const { lote, id_medicamento, quantidade, codigo_lote_chave_parcial } = req.body;

  if (!lote || !quantidade || !codigo_lote_chave_parcial) {
    return res.status(400).send({
      error: 'Campos obrigatórios: lote, quantidade, codigo_lote_chave_parcial',
    });
  }

  db.run(
    'INSERT INTO Estoque (lote, id_medicamento, quantidade, codigo_lote_chave_parcial) VALUES (?, ?, ?, ?)',
    [lote, id_medicamento, quantidade, codigo_lote_chave_parcial],
    function (err) {
      if (err) {
        res.status(500).send({ error: err.message });
      } else {
        res
          .status(201)
          .send({ message: 'Estoque criado com sucesso', id: this.lastID });
      }
    }
  );
};

export const update = (req, res) => {
  const { id } = req.params;
  const { lote, quantidade, codigo_lote_chave_parcial } = req.body;

  db.run(
    'UPDATE Estoque SET lote = ?, quantidade = ?, codigo_lote_chave_parcial = ? WHERE id_medicamento = ?',
    [lote, quantidade, codigo_lote_chave_parcial, id],
    function (err) {
      if (err) {
        res.status(500).send({ error: err.message });
      } else if (this.changes === 0) {
        res.status(404).send({ message: 'Estoque não encontrado' });
      } else {
        res.send({ message: 'Estoque atualizado com sucesso' });
      }
    }
  );
};

export const remove = (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM Estoque WHERE id_medicamento = ?', [id], function (err) {
    if (err) {
      res.status(500).send({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).send({ message: 'Estoque não encontrado' });
    } else {
      res.send({ message: 'Estoque removido com sucesso' });
    }
  });
};
