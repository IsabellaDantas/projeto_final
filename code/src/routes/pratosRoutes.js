const express = require('express');
const router = express.Router();
const pratosController = require('../controllers/pratosController');

router.post('/pratos', pratosController.createPrato); 
router.get('/pratos', pratosController.getPratos); 
router.get('/pratos/:id', pratosController.getPratoById); 
router.get('/pratos/nome', pratosController.getPratoByNome); 
router.get('/pratos/:categoria', pratosController.getPratoByCategoria); 
router.put('/pratos/:id', pratosController.updatePrato); 
router.delete('/pratos/:id', pratosController.deletePrato); 

module.exports = router;