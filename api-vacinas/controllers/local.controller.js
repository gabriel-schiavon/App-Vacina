const db = require('../database/db');

exports.cadastrar = (req, res) => {
  const { cnpj, nome, endereco, email, senha } = req.body;

  const sql = `INSERT INTO locais (cnpj, nome, endereco, email, senha)
              VALUES (?, ?, ?, ?, ?)`;

  db.run(sql, [cnpj, nome, endereco, email, senha], function (err) {
    if (err) {
      console.error('Erro ao cadastrar local:', err);
      return res.status(500).json({ mensagem: 'Erro ao cadastrar local' });
    }

    res.status(201).json({ id: this.lastID });
  });

};

exports.listar = (req, res) => {
  db.all('SELECT * FROM locais', (err, rows) => {
    if (err) {
      console.error('Erro ao listar locais:', err);
      return res.status(500).json({ mensagem: 'Erro ao listar locais' });
    }

    res.status(200).json(rows);
  });
};

exports.login = (req, res) => {
  const { email, senha } = req.query;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: 'Email e senha são obrigatórios' });
  }

  db.get('SELECT * FROM locais WHERE email = ? AND senha = ?', [email, senha], (err, row) => {
    if (err) {
      console.error('Erro ao fazer login (local):', err);
      return res.status(500).json({ mensagem: 'Erro interno' });
    }

    if (!row) {
      return res.status(401).json({ mensagem: 'Local não encontrado' });
    }

    res.status(200).json(row);
  });
};

