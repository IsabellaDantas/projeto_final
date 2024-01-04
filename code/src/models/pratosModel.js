const db = require('../database/db'); 

class PratosModel {

  async createPrato(nome, descricao, preco, quantidade, imagem , categoria) {
    const query = 'INSERT INTO pratos (nome, descricao, preco, quantidade, imagem, categoria) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [nome, descricao, preco, quantidade, imagem, categoria];


    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getPratos() {
    const query = 'SELECT * FROM pratos ORDER BY nome';
    try {
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async getPratoById(idPrato) {
    const query = 'SELECT * FROM pratos WHERE id = $1';
    const values = [idPrato];

    try {
      const result = await db.query(query, values);
      const prato = result.rows[0];
      return prato;
    } catch (error) {
      console.error('Erro ao obter detalhes do prato pelo ID:', error);
      throw new Error('Erro interno do servidor');
    }
  }


  async getPratoByNome(nome) {
    try {

      const query = `SELECT * FROM pratos WHERE nome ILIKE '%$1%' RETURNING *;`;
      const values = [`%${nome}%`];

      const result = await db.query(query, values);
      const pratos = result.rows;

      return pratos; 
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao buscar prato por nome');
    }
  }

  async getPratoByCategoria(categoria) {
    try {
      const query = `SELECT * FROM pratos WHERE categoria ILIKE '%$1%' RETURNING *;`;
      const values = [`%${categoria}%`];

      const result = await db.query(query, values);
      const pratos = result.rows;

      return pratos;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao buscar prato por categoria')
    }
  }


  async updatePrato(id, nome, descricao, preco, quantidade, imagem, categoria) {
    // Convertendo id para número inteiro
    id = parseInt(id, 10);
  
  
    const query = 'UPDATE pratos SET nome = $2, descricao = $3, preco = $4, quantidade = $5, imagem = $6, categoria = $7 WHERE id = $1 RETURNING *';
    const values = [id, nome, descricao, preco, quantidade, imagem, categoria];
   
  
    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
  


  async deletePrato(id) {
    const query = 'DELETE FROM pratos WHERE id = $1 RETURNING *';
    const values = [id];


    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  //---------------------TESTE------------------------
  async getProdutos() {
    const query = 'SELECT * FROM produtos';
    try {
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async getProdutosByName(nome) {
    try {
      const query = 'SELECT * FROM produtos WHERE nome LIKE $1';
      const values = [`%${nome}%`];
  
      const result = await db.query(query, values);
      const produtos = result.rows;
  
      return produtos;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao buscar produtos por nome');
    }
  }
  
    async createProduto(nome, valor, categoria, quantidade) {
      const query = 'INSERT INTO produtos (nome, valor, categoria, quantidade) VALUES ($1, $2, $3, $4) RETURNING *';
      const values = [nome, valor, categoria, quantidade];
  
      try {
        const result = await db.query(query, values);
        return result.rows[0];
      } catch (error) {
        throw error;
      }
    }
}


module.exports = new PratosModel();