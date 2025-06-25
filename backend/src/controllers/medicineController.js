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
  const { nome, dosagem, principio_ativo, data_validade } = req.body;
  db.run(
    'INSERT INTO Medicamento (nome, dosagem, principio_ativo, data_validade) VALUES (?, ?, ?, ?)',
    [nome, dosagem, principio_ativo, data_validade],
    function (err) {
      if (err) {
        res.status(500).send({ error: err.message });
      } else {
        res.send({ message: 'Medicamento criado com sucesso' });
      }
    }
  );
};

export const update = (req, res) => {
  const { id } = req.params;
  const { nome, dosagem, principio_ativo, data_validade } = req.body;
  db.run(
    'UPDATE Medicamento SET nome = ?, dosagem = ?, principio_ativo = ?, data_validade = ? WHERE id = ?',
    [nome, dosagem, principio_ativo, data_validade, id],
    function (err) {
      if (err) {
        res.status(500).send({ error: err.message });
      } else {
        res.send({ message: 'Medicamento atualizado com sucesso' });
      }
    }
  );
};

export const remove = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM Medicamento WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.send({ message: 'Medicamento removido com sucesso' });
    }
  });
};
