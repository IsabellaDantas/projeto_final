const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

//----------- ARQUIVO DE ROTAS PARA USUARIOS -----------

/*Essas rotas são para cadastrar um usuario (rota POST '/cadastro'), 
retornar todos os usuarios e retornar usuario específico (rotas GET '/cadastro' e GET '/cadastro), 
atualizar dados do usuario e seu endereço (rotas PUT '/cadastro/usuario/:id' e PUT '/cadastro/endereco/:id'),
realizar login do usuario (rota POST '/login')
*/  
//ok é quando dá certo em testes de requisição

router.post('/cadastro', usuarioController.createUsuario); //ok 
router.get('/cadastro', usuarioController.getUsuarios); //ok
router.get('/cadastro/:id', usuarioController.getUsuarioById) //ok
router.put('/cadastro/usuario/:id', usuarioController.updateUsuarioById); //ok
router.put('/cadastro/endereco/:id', usuarioController.updateEnderecoById) //ok
router.put('/cadastro/credenciar/:id', usuarioController.updateCredenciarUsuario); //ok
router.put('/cadastro/descredenciar/:id', usuarioController.updateDescredenciarUsuario); //ok
router.post('/login', usuarioController.loginUsuario); //ok

module.exports = router;