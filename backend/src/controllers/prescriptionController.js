export const findAll = (req, res) => {
  db.all('SELECT * FROM Prescricao', (err, rows) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.send(rows);
    }
  });
};

export const create = (req, res) => {
  const { data_emissao, id_medico, id_paciente } = req.body;

  db.run(
    'INSERT INTO Prescricao (data_emissao, id_medico, id_paciente) VALUES (?, ?, ?)',
    [data_emissao, id_medico, id_paciente],
    function (err) {
      if (err) {
        res.status(500).send({ error: err.message });
      } else {
        res.send({ message: 'Prescrição criada com sucesso' });
      }
    }
  );
};

export const update = (req, res) => {
  const { id } = req.params;
  const { data_emissao, id_medico, id_paciente } = req.body;

  db.run(
    'UPDATE Prescricao SET data_emissao = ?, id_medico = ?, id_paciente = ? WHERE id = ?',
    [data_emissao, id_medico, id_paciente, id],
    function (err) {
      if (err) {
        res.status(500).send({ error: err.message });
      } else {
        res.send({ message: 'Prescri o atualizada com sucesso' });
      }
    }
  );
};