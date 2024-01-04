const compraModel = require('../models/compraModel'); 

class CompraController {
    async solicitarCompra(req, res) {
        const { id_cliente, id_produto, quantidade, data_compra} = req.body; 

        try {
          const compra = await compraModel.solicitarCompra(id_cliente, id_produto, quantidade, data_compra);

          res.status(201).json(compra);
        } catch (error) {
          console.error(error);
          res.status(500).json(error);
        }
    }

    async getCompras(req, res) {
      try {
        const compras = await compraModel.getCompras();
        res.json(compras);
      } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message})
      }
    }

    async getCompraByCliente(req, res) {
      const { id_cliente } = req.params;

      try {
        const compras = await compraModel.getComprasByCliente(id_cliente);
        res.json(compras);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter compras por cliente' });
      }
    } 

}


module.exports = new CompraController(); 