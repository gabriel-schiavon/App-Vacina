const db = require('../database/db');

exports.listarTodas = (req, res) => {
  db.all('SELECT * FROM vacinas', (err, rows) => {
    if (err) {
      console.error('Erro ao buscar vacinas:', err);
      return res.status(500).json({ mensagem: 'Erro ao buscar vacinas' });
    }
    res.status(200).json(rows);
  });
};

exports.buscarPorId = (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM vacinas WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Erro ao buscar vacina por ID:', err);
      return res.status(500).json({ mensagem: 'Erro ao buscar vacina' });
    }
    if (!row) {
      return res.status(404).json({ mensagem: 'Vacina não encontrada' });
    }
    res.status(200).json(row);
  });
};

exports.naoTomadas = (req, res) => {
  const idUsuario = req.params.idUsuario;

  const sql = `
    SELECT * FROM vacinas
    WHERE id NOT IN (
      SELECT idVacina FROM agendamentos WHERE idUsuario = ?
    )
  `;

  db.all(sql, [idUsuario], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar vacinas não tomadas:', err);
      return res.status(500).json({ mensagem: 'Erro interno' });
    }

    res.status(200).json(rows);
  });
};

exports.buscarPorNome = (req, res) => {
  const nomeVacina = req.query.nomeVacina;

  if (!nomeVacina) {
    return res.status(400).json({ mensagem: 'Parâmetro nomeVacina obrigatório.' });
  }

  const sql = `
    SELECT * FROM vacinas
    WHERE LOWER(nomeVacina) = LOWER(?)
    LIMIT 1
  `;

  db.all(sql, [nomeVacina], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar vacina por nome:', err);
      return res.status(500).json({ mensagem: 'Erro ao buscar vacina' });
    }

    res.status(200).json(rows);
  });
};