import db from '../db.js';

export const findAll = (req, res) => {
  const query = `
    SELECT 
      Saida_Medicamento.quantidade_retirada,
      datetime(Saida_Medicamento.data_movimentacao / 1000, 'unixepoch', '-3 hours') AS data_movimentacao,
      Medicamento.nome AS nome_medicamento,
      Medicamento.data_validade AS data_validade,
      Saida_Medicamento.lote,
      Gera.id_prescricao,
      Medico.nome AS nome_medico
    FROM Saida_Medicamento
    LEFT JOIN Gera ON Saida_Medicamento.id = Gera.id_saida_medicamento
    LEFT JOIN Medicamento ON Saida_Medicamento.id_medicamento = Medicamento.id
    LEFT JOIN Prescricao ON Gera.id_prescricao = Prescricao.id
    LEFT JOIN Medico ON Prescricao.id_medico = Medico.id
  `;

  db.all(query, function (err, rows) {
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
