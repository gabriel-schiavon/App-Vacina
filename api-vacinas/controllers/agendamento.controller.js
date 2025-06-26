const db = require('../database/db');

exports.criar = (req, res) => {
  const { idUsuario, idVacina, idLocal, data } = req.body;

  const sql = `INSERT INTO agendamentos (idUsuario, idVacina, idLocal, data)
               VALUES (?, ?, ?, ?)`;

  db.run(sql, [idUsuario, idVacina, idLocal, data], function (err) {
    if (err) {
      console.error('Erro ao agendar:', err);
      return res.status(500).json({ mensagem: 'Erro ao agendar' });
    }
    res.status(201).json({ id: this.lastID });
  });
};

exports.listarPorUsuario = (req, res) => {
  const idUsuario = req.params.idUsuario;

  const sql = `SELECT * FROM agendamentos WHERE idUsuario = ?`;

  db.all(sql, [idUsuario], (err, rows) => {
    if (err) {
      console.error('Erro ao listar agendamentos:', err);
      return res.status(500).json({ mensagem: 'Erro ao listar agendamentos' });
    }
    res.status(200).json(rows);
  });
};
