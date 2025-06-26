const db = require('../database/db');

exports.registrar = (req, res) => {
  const { idUsuario, idVacina, dataAplicacao } = req.body;

  const sql = `INSERT INTO historico (idUsuario, idVacina, dataAplicacao)
                VALUES (?, ?, ?)`;

  db.run(sql, [idUsuario, idVacina, dataAplicacao], function(err) {
    if (err) {
      console.error('Erro ao registrar histórico:', err);
      return res.status(500).json({ mensagem: 'Erro ao registrar histórico' });
    }
    res.status(201).json({ id: this.lastID });
  });
};

exports.listarPorUsuario = (req, res) => {
  const idUsuario = req.query.idUsuario;
  if (!idUsuario) {
    return res.status(400).json({ mensagem: 'ID do usuário é obrigatório' });
  }

  const sql = 'SELECT * FROM historico WHERE idUsuario = ?';
  db.all(sql, [idUsuario], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar histórico:', err);
      return res.status(500).json({ mensagem: 'Erro ao buscar histórico' });
    }
    res.status(200).json(rows);
  });
};

// exports.excluir = (req, res) => {
//   const id = req.params.id;

//   const sql = 'DELETE FROM historico WHERE id = ?';
//   db.run(sql, [id], function (err) {
//     if (err) {
//       console.error('Erro ao excluir histórico:', err);
//       return res.status(500).json({ mensagem: 'Erro ao excluir registro' });
//     }

//     if (this.changes === 0) {
//       return res.status(404).json({ mensagem: 'Registro não encontrado' });
//     }

//     res.status(200).json({ mensagem: 'Registro excluído com sucesso' });
//   });
// };


exports.excluirPorUsuario = (req, res) => {
  const idUsuario = req.params.idUsuario;

  const sql = 'DELETE FROM historico WHERE idUsuario = ?';
  db.run(sql, [idUsuario], function (err) {
    if (err) {
      console.error('Erro ao excluir histórico por usuário:', err);
      return res.status(500).json({ mensagem: 'Erro ao excluir histórico do usuário' });
    }

    res.status(200).json({ mensagem: 'Histórico do usuário excluído com sucesso' });
  });
};
