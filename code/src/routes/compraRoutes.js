const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');

//as rotas foram testadas por requisições
router.post('/compras', compraController.solicitarCompra); //ok
router.get('/compras', compraController.getCompras); //ok
router.get('/compras/:id_cliente', compraController.getCompraByCliente); //ok

module.exports = router;