export const findAll = (req, res) => {
  db.all('SELECT * FROM Gera', (err, rows) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.send(rows);
    }
  });
};

export const create = (req, res) => {
  const { id_saida_medicamento, id_prescricao } = req.body;

  db.run(
    'INSERT INTO Gera (id_saida_medicamento, id_prescricao) VALUES (?, ?)',
    [id_saida_medicamento, id_prescricao],
    function (err) {
      if (err) {
        res.status(500).send({ error: err.message });
      } else {
        res.send({ message: 'Relação criada com sucesso' });
      }
    }
  );
};

export const update = (req, res) => {
  const { id_saida_medicamento, id_prescricao } = req.body;
  const id = req.params.id;

  db.run(
    'UPDATE Gera SET id_saida_medicamento = ?, id_prescricao = ? WHERE id = ?',
    [id_saida_medicamento, id_prescricao, id],
    function (err) {
      if (err) {
        res.status(500).send({ error: err.message });
      } else {
        res.send({ message: 'Relação atualizada com sucesso' });
      }
    }
  );
};

