const express = require('express');
const router = express.Router();
const localController = require('../controllers/local.controller');


router.get('/login', localController.login);
router.post('/', localController.cadastrar);
router.get('/', localController.listar);

module.exports = router;
