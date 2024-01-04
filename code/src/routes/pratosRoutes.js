const express = require('express');
const router = express.Router();
const pratosController = require('../controllers/pratosController');

//as rotas foram testadas por requisições 
router.get('/pratos/nome/', pratosController.getPratoByNome); 
router.get('/pratos/categoria/', pratosController.getPratoByCategoria);
router.post('/pratos', pratosController.createPrato); 
router.get('/pratos', pratosController.getPratos); 
router.get('/pratos/:id', pratosController.getPratoById); 
router.put('/pratos/:id', pratosController.updatePrato); 
router.delete('/pratos/:id', pratosController.deletePrato); 

module.exports = router;