const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.resolve(__dirname, '../vaxiagenda.sqlite'));

db.serialize(() => {
  // Criação das tabelas
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    cpf TEXT UNIQUE,
    dataNasc TEXT,
    telefone TEXT,
    endereco TEXT,
    email TEXT,
    senha TEXT,
    responsavelCpf TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS vacinas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nomeVacina TEXT,
    intervalo INTEGER,
    descricao TEXT
  )`);

  // Pré-cadastro das vacinas
  db.get('SELECT COUNT(*) AS total FROM vacinas', (err, row) => {
    if (row.total === 0) {
      const vacinas = [ 
        ["Hepatite B", 0, "Vacina para recém-nascidos"],
        ["BCG", 0, "Vacina para recém-nascidos"],
        ["Pentavalente (1ª dose)", 0, "Vacina a ser tomada no 2º mês de vida"],
        ["Pentavalente (2ª dose)", 0, "Vacina a ser tomada no 4º mês de vida"],
        ["VIP/VOP (1ª dose)", 0, "Vacina a ser tomada no 2º mês de vida"],
        ["VIP/VOP (2ª dose)", 0, "Vacina a ser tomada no 4º mês de vida"],
        ["VIP/VOP (3ª dose)", 0, "Vacina a ser tomada no 6º mês de vida"],
        ["Rotavírus humano (1ª dose)", 0, "Vacina a ser tomada no 2º mês de vida * G1P1 [8] (atenuada) - (VRH) *"],
        ["Rotavírus humano (2ª dose)", 0, "Vacina a ser tomada no 4º mês de vida * G1P1 [8] (atenuada) - (VRH) *"],
        ["Pneumocócica 10-valente (1ª dose)", 0, "Vacina a ser tomada no 2º mês de vida"],
        ["Pneumocócica 10-valente (2ª dose)", 0, "Vacina a ser tomada no 4º mês de vida"],
        ["Pneumocócica 10-valente (Reforço)", 0, "Vacina a ser tomada com 1 ano de vida"],
        ["Meningocócica C conjugada(1ª dose)", 0, "Vacina a ser tomada no 3º mês de vida"],
        ["Meningocócica C conjugada(2ª dose)", 0, "Vacina a ser tomada no 5º mês de vida"],
        ["Febre Amarela(1ª dose)", 0, "Vacina a ser tomada no 9º mês e 4º e 5º ano de vida"],
        ["Pentavalente (3ª dose)", 0, "Vacina a ser tomada no 6º mês de vida"],
        ["Meningocócica C conjugada(Reforço)", 0, "cina a ser tomada no 12º mês de vida"],
        ["Tríplice Viral", 0, "Vacina a ser tomada no 12º mês de vida"],
        ["DTP (1º Reforço)", 0, "Vacina a ser tomada no 15º mês de vida"],
        ["Poliomielite 1 e 3 - VOPb (1º Reforço)", 0, "Vacina a ser tomada no 15º mês de vida"],
        ["Hepatite A (1ª dose)", 0, "Vacina a ser tomada no 15º mês de vida"],
        ["Tetra viral (1ª dose)", 0, "Vacina a ser tomada no 15º mês de vida"],
        ["DTP (2º Reforço)", 0, "Vacina a ser tomada com 4 anos de vida"],
        ["Febre Amarela (Reforço)", 0, "Vacina a ser tomada com 4 anos de vida"],
        ["Poliomielite 1 e 3 - VOPb (2º Reforço)", 0, "Vacina a ser tomada com 4 anos de vida"],
        ["Varicela (1ª dose)", 0, "Vacina a ser tomada com 4 anos de vida"],
        ["Pneumocócica 23-valente", 0, "Vacina a ser tomada com 5 anos de vida"],
        ["HPV infantil", 0, "Vacina a ser tomada entre 9 a 10 anos de vida"],
        ["HPV adolescente", 0, "Vacina a ser tomada entre 11 a 14 anos de vida"],
        ["Meningocócica ACWY", 0, "Vacina a ser tomada entre 11 a 14 anos de vida"],
        ["Tétano", 10, "Vacina a ser tomada na fase adulta"],
        ["Tríplice viral (1ª dose)", 0, "Vacina a ser tomada na fase adulta"],
        ["Tríplice viral (2ª dose)", 0, "Vacina a ser tomada na fase adulta"],
        ["Tríplice (dose única)", 0, "Vacina a ser tomada na fase adulta"],
        ["Pneumocócica 23-valente (adulto)", 0, "Vacina a ser tomada na fase adulta"],
        ["Febre Amarela (adulto)", 0, "Vacina a ser tomada na fase adulta"],
        ["Influenza", 0, "Vacina da gripe"],
        ["Covid", 6, "Vacina da Covid"]
      ];

      const stmt = db.prepare(`INSERT INTO vacinas (nomeVacina, intervalo, descricao) VALUES (?, ?, ?)`);
      for (const vacina of vacinas) {
        stmt.run(vacina);
      }
      stmt.finalize();
      console.log('Vacinas pré-cadastradas com sucesso! 🎉');
    }
  });

  db.run(`CREATE TABLE IF NOT EXISTS historico (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idUsuario INTEGER,
    idVacina INTEGER,
    dataAplicacao TEXT,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(id),
    FOREIGN KEY (idVacina) REFERENCES vacinas(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS locais (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cnpj TEXT NOT NULL,
    nome TEXT NOT NULL,
    endereco TEXT NOT NULL,
    email TEXT NOT NULL,
    senha TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS vacinas_locais (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idLocal INTEGER NOT NULL,
    idVacina INTEGER NOT NULL,
    FOREIGN KEY (idLocal) REFERENCES locais(id),
    FOREIGN KEY (idVacina) REFERENCES vacinas(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS agendamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idUsuario INTEGER NOT NULL,
    idVacina INTEGER NOT NULL,
    idLocal INTEGER NOT NULL,
    data TEXT NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(id),
    FOREIGN KEY (idVacina) REFERENCES vacinas(id),
    FOREIGN KEY (idLocal) REFERENCES locais(id)
  )`);



});

module.exports = db;
