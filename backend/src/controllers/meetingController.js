export const findAll = (req, res) => {
  db.all('SELECT * FROM Atende', (err, rows) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.send(rows);
    }
  });
};

export const create = (req, res) => {
  const { id_medico, id_paciente } = req.body;

  db.run(
    'INSERT INTO Atende (id_medico, id_paciente) VALUES (?, ?)',
    [id_medico, id_paciente],
    function (err) {
      if (err) {
        res.status(500).send({ error: err.message });
      } else {
        res.send({ message: 'Atendimento criado com sucesso' });
      }
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
