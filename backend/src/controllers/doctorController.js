import db from '../db.js';

export const findAll = (req, res) => {
  db.all('SELECT * FROM Medico', (err, rows) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.send(rows);
    }
  });
};

export const findOne = (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM Medico WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else if (!row) {
      res.status(404).send({ message: 'Médico não encontrado' });
    } else {
      res.send(row);
    }
  });
};

export const create = (req, res) => {
  const { nome, crm, especialidade } = req.body;

  if (!nome || !crm || !especialidade) {
    return res
      .status(400)
      .send({ error: 'Campos obrigatórios: nome, crm, especialidade' });
  }

  db.run(
    'INSERT INTO Medico (nome, crm, especialidade) VALUES (?, ?, ?)',
    [nome, crm, especialidade],
    function (err) {
      if (err) {
        res.status(500).send({ error: err.message });
      } else {
        res
          .status(201)
          .send({ message: 'Médico criado com sucesso', id: this.lastID });
      }
    }
  );
};

export const update = (req, res) => {
  const { id } = req.params;
  const { nome, crm, especialidade } = req.body;

  db.run(
    'UPDATE Medico SET nome = ?, crm = ?, especialidade = ? WHERE id = ?',
    [nome, crm, especialidade, id],
    function (err) {
      if (err) {
        res.status(500).send({ error: err.message });
      } else if (this.changes === 0) {
        res.status(404).send({ message: 'Médico não encontrado' });
      } else {
        res.send({ message: 'Médico atualizado com sucesso' });
      }
    }
  );
};

export const remove = (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM Medico WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).send({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).send({ message: 'Médico não encontrado' });
    } else {
      res.send({ message: 'Médico removido com sucesso' });
    }
  });
};
