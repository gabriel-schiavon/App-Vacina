const db = require('../database/db');

exports.vincularVacinas = (req, res) => {
  const { idLocal, idsVacinas } = req.body;

    if (!idLocal || !Array.isArray(idsVacinas) || idsVacinas.length === 0) {
        return res.status(400).json({ mensagem: 'Nenhuma vacina selecionada para vincular.' });
    }


  const sql = 'INSERT INTO vacinas_locais (idLocal, idVacina) VALUES (?, ?)';
  const stmt = db.prepare(sql);

  idsVacinas.forEach(idVacina => {
    stmt.run(idLocal, idVacina);
  });

  stmt.finalize(err => {
    if (err) {
      console.error('Erro ao vincular vacinas:', err);
      return res.status(500).json({ mensagem: 'Erro ao vincular vacinas' });
    }
    res.status(201).json({ mensagem: 'Vacinas vinculadas com sucesso' });
  });
};

exports.buscarPorLocal = (req, res) => {
  const idLocal = req.params.idLocal;

  const sql = `
    SELECT v.* FROM vacinas v
    JOIN vacinas_locais vl ON vl.idVacina = v.id
    WHERE vl.idLocal = ?
  `;

  db.all(sql, [idLocal], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar vacinas por local:', err);
      return res.status(500).json({ mensagem: 'Erro ao buscar vacinas' });
    }
    res.status(200).json(rows);
  });
};

exports.buscarLocaisPorVacina = (req, res) => {
  const idVacina = req.params.idVacina;

  const sql = `
    SELECT l.* FROM locais l
    JOIN vacinas_locais vl ON vl.idLocal = l.id
    WHERE vl.idVacina = ?
  `;

  db.all(sql, [idVacina], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar locais por vacina:', err);
      return res.status(500).json({ mensagem: 'Erro ao buscar locais' });
    }

    res.status(200).json(rows);
  });
};
