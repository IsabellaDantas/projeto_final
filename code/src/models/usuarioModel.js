const db = require('../database/db');
const jwt = require('jsonwebtoken');

class usuarioModel {
    
  async createUsuario(nome, email, telefone, senha, bairro, rua, n_casa) {
    const query = `
        WITH novo_usuario AS (
          INSERT INTO usuarios (nome, email, telefone, senha) VALUES ($1, $2, $3, $4) RETURNING id
        )
        INSERT INTO endereco (bairro, rua, n_casa, id_cliente)
        VALUES ($5, $6, $7, (SELECT id FROM novo_usuario));
    `;
  
    const values = [nome, email, telefone, senha, bairro, rua, n_casa];
  
    try {
      console.log(query);
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
  
  async getUsuarios(){
    const query = `
        SELECT usuarios.id, usuarios.nome, usuarios.telefone, usuarios.credenciado, endereco.bairro, endereco.rua, endereco.n_casa
        FROM usuarios
        JOIN endereco ON usuarios.id = endereco.id_cliente;
    `;

    try {
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async getUsuarioById(id){
    const query = `
        SELECT usuarios.nome, usuarios.email, usuarios.telefone, usuarios.credenciado, endereco.bairro, endereco.rua, endereco.n_casa
        FROM usuarios
        JOIN endereco ON usuarios.id = endereco.id_cliente
        WHERE usuarios.id = $1; 
    `; 
    
    try {
      const result = await db.query(query, [id]);
      const usuario = result.rows[0];
      return usuario;
    } catch (error) {
      console.error('Erro ao obter detalhes do usuario pelo ID:', error);
      throw new Error('Erro interno do servidor');
    }
  }  

  async updateUsuarioById(id, nome, email, telefone, senha) {
    const query = `
        UPDATE usuarios
        SET nome = $2, email = $3, telefone = $4, senha = $5
        WHERE usuarios.id = $1
        RETURNING *;
    `;

    const values = [ id, nome,  email, telefone, senha];
    
    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error; 
    }
  }

  async updateEnderecoById(id, bairro, rua, n_casa){
    const query = `
        UPDATE endereco
        SET bairro = $2, rua = $3, n_casa = $4
        FROM usuarios
        WHERE endereco.id_cliente = usuarios.id AND usuarios.id = $1
        RETURNING id, bairro, rua, n_casa;
    `;

    const values = [id, bairro, rua, n_casa];

    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error; 
    }
  }

  async updateCredenciarUsuario(id, email) {
    const query = `
      UPDATE usuarios SET credenciado = true WHERE id = $1 AND email = $2;
    `;
    const values = [id, email];

    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async updateDescredenciarUsuario(id, email) {
    const query = `
      UPDATE usuarios SET credenciado = false WHERE id = $1 AND email = $2;
    `;
    const values = [id, email];

    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }

  }



  async loginUsuario(email, senha) {
    const query = 'SELECT * FROM usuarios WHERE email = $1 AND senha = $2';
    const values = [email, senha];


    try {
      const result = await db.query(query, values);


      if (result.rows.length === 0) {
        throw new Error('Email ou senha invalidos');
      }


      const user = result.rows[0];
      const token = jwt.sign({ userId: user.id }, 'aksjdpolikchpiaodkjkl', { expiresIn: '1h' });


      return { token };
    } catch (error) {
      throw { message: error.message, status: 500 };
    }
  }


}

module.exports = new usuarioModel();