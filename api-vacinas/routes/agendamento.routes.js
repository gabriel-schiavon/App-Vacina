const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamento.controller');

router.post('/', agendamentoController.criar);
router.get('/:idUsuario', agendamentoController.listarPorUsuario);

module.exports = router;
