const express = require('express');
const router = express.Router();
const historicoController = require('../controllers/historico.controller');

router.post('/', historicoController.registrar);
router.get('/', historicoController.listarPorUsuario);
// router.delete('/:id', historicoController.excluir);
router.delete('/usuario/:idUsuario', historicoController.excluirPorUsuario);


module.exports = router;
