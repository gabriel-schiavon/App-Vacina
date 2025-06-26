const express = require('express');
const router = express.Router();
const vacinaController = require('../controllers/vacina.controller');

router.get('/nao-tomadas/:idUsuario', vacinaController.naoTomadas);
router.get('/buscarPorNome', vacinaController.buscarPorNome);
router.get('/', vacinaController.listarTodas);
router.get('/:id', vacinaController.buscarPorId);



module.exports = router;
