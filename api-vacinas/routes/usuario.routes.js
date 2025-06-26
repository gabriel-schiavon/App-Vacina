const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

// Rota para cadastrar novo usuário
router.post('/', usuarioController.cadastrar);

// Rota para buscar usuário por CPF
router.get('/todos', usuarioController.listar);
router.get('/login', usuarioController.login);
router.get('/', usuarioController.buscarPorCpf);
router.get('/:id', usuarioController.buscarPorId);
router.put('/:id', usuarioController.atualizar);
router.delete('/:id', usuarioController.excluir);



module.exports = router;
