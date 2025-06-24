import db from '../db.js';

export const findAll = (req, res) => {
  db.all('SELECT * FROM Paciente', (err, rows) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.send(rows);
    }
  });
};

export const findOne = (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM Paciente WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else if (!row) {
      res.status(404).send({ message: 'Paciente não encontrado' });
    } else {
      res.send(row);
    }
  });
};

export const create = (req, res) => {
  const { nome, cartao_sus } = req.body;

  if (!nome || !cartao_sus) {
    return res.status(400).send({ error: 'Campos obrigatórios: nome, cartao_sus' });
  }

  db.run(
    'INSERT INTO Paciente (nome, cartao_sus) VALUES (?, ?)',
    [nome, cartao_sus],
    function (err) {
      if (err) {
        res.status(500).send({ error: err.message });
      } else {
        res.status(201).send({ message: 'Paciente criado com sucesso', id: this.lastID });
      }
    }
  );
};

export const update = (req, res) => {
  const { id } = req.params;
  const { nome, cartao_sus } = req.body;

  db.run(
    'UPDATE Paciente SET nome = ?, cartao_sus = ? WHERE id = ?',
    [nome, cartao_sus, id],
    function (err) {
      if (err) {
        res.status(500).send({ error: err.message });
      } else if (this.changes === 0) {
        res.status(404).send({ message: 'Paciente não encontrado' });
      } else {
        res.send({ message: 'Paciente atualizado com sucesso' });
      }
    }
  );
};

export const remove = (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM Paciente WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).send({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).send({ message: 'Paciente não encontrado' });
    } else {
      res.send({ message: 'Paciente removido com sucesso' });
    }
  });
};
