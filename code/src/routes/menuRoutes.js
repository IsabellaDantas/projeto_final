const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController'); 

//as rotas foram testadas por requisições
router.post('/menu', menuController.inserirMenu);
router.get('/menu', menuController.getMenu);
router.get('/menu/pratos', menuController.getPratosMenu);

module.exports = router;