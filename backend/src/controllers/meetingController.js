import db from '../db.js';

export const findAll = (req, res) => {
  const query = `
    SELECT 
      Atende.id_medico,
      Medico.nome AS nome_medico,
      Atende.id_paciente,
      Paciente.nome AS nome_paciente,
      Medico.especialidade AS medico_especialidade
    FROM Atende
    JOIN Medico ON Atende.id_medico = Medico.id
    JOIN Paciente ON Atende.id_paciente = Paciente.id
  `;

  db.all(query, (err, rows) => {
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
