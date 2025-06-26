const express = require('express');
const router = express.Router();
const controller = require('../controllers/vacinaLocal.controller');

router.post('/vincular', controller.vincularVacinas);
router.get('/:idLocal', controller.buscarPorLocal);
router.get('/por-vacina/:idVacina', controller.buscarLocaisPorVacina);


module.exports = router;
