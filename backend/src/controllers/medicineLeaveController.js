import db from '../db.js';

export const findAll = (req, res) => {
  db.all('SELECT * FROM Saida_Medicamento', function (err, rows) {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.send(rows);
    }
  });
};

export const create = (req, res) => {
  const { data_movimentacao, quantidade_retirada, id_medicamento, lote } =
    req.body;

  db.run(
    'INSERT INTO Saida_Medicamento (data_movimentacao, quantidade_retirada, id_medicamento, lote) VALUES (?, ?, ?, ?)',
    [data_movimentacao, quantidade_retirada, id_medicamento, lote],
    function (err) {
      if (err) {
        res.status(500).send({ error: err.message });
      } else {
        res.send({ message: 'Saída de medicamento registrada com sucesso' });
      }
    }
  );
};

export const update = (req, res) => {
  const { id } = req.params;
  const { data_movimentacao, quantidade_retirada, id_medicamento, lote } =
    req.body;

  db.run(
    'UPDATE Saida_Medicamento SET data_movimentacao = ?, quantidade_retirada = ?, id_medicamento = ?, lote = ? WHERE id_saida_medicamento = ?',
    [data_movimentacao, quantidade_retirada, id_medicamento, lote, id],
    function (err) {
      if (err) {
        res.status(500).send({ error: err.message });
      } else if (this.changes === 0) {
        res
          .status(404)
          .send({ message: 'Saída de medicamento não encontrada' });
      } else {
        res.send({ message: 'Saída de medicamento atualizada com sucesso' });
      }
    }
  );
};
