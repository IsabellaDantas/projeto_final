const db = require('../database/db'); 

class MenuModel {
    async inserirMenu(cardapio_dia){
        const query = `INSERT INTO Menu (cardapio_dia) VALUES ($1) RETURNING *;`;
        const values = [cardapio_dia];

        try{
            const result = await db.query(query, values);
            return result.rows[0]; 
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao inserir no Menu com referência ao id dos pratos');
        }
    }

    async getMenu(){
        const query = 'SELECT * FROM Menu';
        try {
            const result = await db.query(query);
            return result.rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
  }
}


module.exports = new MenuModel();