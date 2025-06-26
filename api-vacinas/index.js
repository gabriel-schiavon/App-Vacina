const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ⬇️ Aqui você conecta as rotas de usuário
const usuarioRoutes = require('./routes/usuario.routes');
const vacinaRoutes = require('./routes/vacina.routes');
const historicoRoutes = require('./routes/historico.routes');
const localRoutes = require('./routes/local.routes');
const vacinaLocalRoutes = require('./routes/vacinaLocal.routes');
const agendamentoRoutes = require('./routes/agendamento.routes');

app.use('/usuarios', usuarioRoutes);
app.use('/vacinas', vacinaRoutes);
app.use('/historicoVacinas', historicoRoutes);
app.use('/locais', localRoutes);
app.use('/vacinas-locais', vacinaLocalRoutes);
app.use('/agendamentos', agendamentoRoutes);


// Teste simples
app.get('/', (req, res) => {
  res.send('API está no ar 🚀');
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
