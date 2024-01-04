const db = require('../database/db');

class CompraModel {

    async solicitarCompra(id_cliente, id_produto, quantidade, data_compra,){
        const query = `
            INSERT INTO Compras (id_cliente, id_produto, quantidade, data_compra, preco_total)
            SELECT $1, $2, $3, $4, Pratos.preco * CAST($3 AS numeric)
            FROM Pratos
            WHERE Pratos.id = $2
            RETURNING *;
        `;

        const values = [id_cliente, id_produto, quantidade, data_compra, preco_total];

        try {
            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getCompras(){
        const query = `SELECT * FROM compras;`;

        try {
            const result = await db.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    async getComprasByCliente(id_cliente){
        const query = 'SELECT * FROM compras WHERE id_cliente = $1';
        const values = [id_cliente];

        try {
            const result = await db.query(query, values);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    
}


module.exports = new CompraModel();