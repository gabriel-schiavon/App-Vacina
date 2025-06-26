const db = require('../database/db');

exports.cadastrar = (req, res) => {
  const {
    nome, cpf, dataNasc, telefone,
    endereco, email, senha, responsavelCpf
  } = req.body;

  const sql = `INSERT INTO usuarios 
    (nome, cpf, dataNasc, telefone, endereco, email, senha, responsavelCpf)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.run(sql, [nome, cpf, dataNasc, telefone, endereco, email, senha, responsavelCpf],
    function(err) {
      if (err) {
        console.error(err);
        res.status(500).json({ mensagem: 'Erro ao cadastrar usuário' });
      } else {
        res.status(201).json({ id: this.lastID, ...req.body });
      }
    });
};

exports.buscarPorCpf = (req, res) => {
  const cpf = req.query.cpf;

  db.all(`SELECT * FROM usuarios WHERE cpf = ?`, [cpf], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ mensagem: 'Erro ao buscar usuário' });
    } else {
      res.status(200).json(rows);
    }
  });
};

exports.listar = (req, res) => {
  db.all('SELECT * FROM usuarios', (err, rows) => {
    if (err) {
      console.error('Erro ao listar usuários:', err);
      return res.status(500).json({ mensagem: 'Erro ao listar usuários' });
    }
    res.status(200).json(rows);
  });
};


// login
exports.login = (req, res) => {
  const { email, senha } = req.query;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: 'Email e senha são obrigatórios' });
  }

  const sql = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';

  db.get(sql, [email, senha], (err, row) => {
    if (err) {
      console.error('Erro ao fazer login:', err);
      return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }

    if (!row) {
      return res.status(401).json({ mensagem: 'Email ou senha inválidos' });
    }

    res.status(200).json(row);
  });
};


// Buscar usuário por ID (GET /usuarios/:id)
exports.buscarPorId = (req, res) => {
  const id = req.params.id;

  db.get('SELECT * FROM usuarios WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      return res.status(500).json({ mensagem: 'Erro ao buscar usuário' });
    }
    if (!row) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
    res.status(200).json(row);
  });
};

// Atualizar usuário (PUT /usuarios/:id)
exports.atualizar = (req, res) => {
  const id = req.params.id;
  const {
    nome, cpf, dataNasc, telefone,
    endereco, email, senha, responsavelCpf
  } = req.body;

  const sql = `UPDATE usuarios SET
    nome = ?, cpf = ?, dataNasc = ?, telefone = ?,
    endereco = ?, email = ?, senha = ?, responsavelCpf = ?
    WHERE id = ?`;

  db.run(sql, [nome, cpf, dataNasc, telefone, endereco, email, senha, responsavelCpf, id], function (err) {
    if (err) {
      console.error('Erro ao atualizar usuário:', err);
      return res.status(500).json({ mensagem: 'Erro ao atualizar usuário' });
    }
    res.status(200).json({ mensagem: 'Usuário atualizado com sucesso' });
  });
};

// Excluir usuário (DELETE /usuarios/:id)
exports.excluir = (req, res) => {
  const id = req.params.id;

  db.run('DELETE FROM usuarios WHERE id = ?', [id], function (err) {
    if (err) {
      console.error('Erro ao excluir usuário:', err);
      return res.status(500).json({ mensagem: 'Erro ao excluir usuário' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    res.status(200).json({ mensagem: 'Usuário excluído com sucesso' });
  });
};
