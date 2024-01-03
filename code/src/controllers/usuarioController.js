const usuarioModel = require('../models/usuarioModel'); 


class usuarioController {
    async createUsuario(req, res) {
      const { nome, email, telefone, senha, bairro, rua, n_casa} = req.body;
  
  
      try {
        const usuario = await usuarioModel.createUsuario(nome, email, telefone, senha, bairro, rua, n_casa);
        //delete usuario.senha;
  
  
        res.status(201).json(usuario);
      } catch (error) {
        console.error(error);
        res.status(500).json(error);
      }
    }
  
    async getUsuarios(req, res) {
      try {
        const usuarios = await usuarioModel.getUsuarios();
        res.json(usuarios);
      } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message})
      }
    }

    async getUsuarioById(req, res) {
      try{
        const usuario = await usuarioModel.getUsuarioById(req.params.id);
 
        if (!usuario) {
          return res.status(404).json({ error: 'Usuario não encontrado' });
        }
   
        res.status(200).json(usuario);
      } catch (error) {
        console.error('Erro ao obter detalhes do usuario:', error);
        res.status(500).json({error: 'Erro interno do servidor'});
      }
    }

    async updateUsuarioById(req, res) {
      const {id} = req.params;
      const {nome, email, telefone, senha} = req.body;

      try {
        const usuario = await usuarioModel.updateUsuarioById(id, nome, email, telefone, senha);
        res.json(usuario);
      } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message})
      }

    }

    async updateEnderecoById(req, res) {
      const {id} = req.params;
      const {bairro, rua, n_casa} = req.body;

      try {
        const usuario = await usuarioModel.updateEnderecoById(id, bairro, rua, n_casa);
        res.json(usuario);
      } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message})
      }
    }

    async updateCredenciarUsuario(req, res) {
      const {id} = req.params; 
      const {email} = req.body;

      try{
        const usuario = await usuarioModel.updateCredenciarUsuario(id, email);
        res.json(usuario);
      } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message})
      }
    }

    async updateDescredenciarUsuario(req, res) {
      const {id} = req.params;
      const {email} = req.body;

      try{
        const usuario = await usuarioModel.updateDescredenciarUsuario(id, email);
        res.json(usuario);
      } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message})
      }

    }


    async loginUsuario(req, res) {
      const { email, senha } = req.body;
  
  
      try {
        const result = await usuarioModel.loginUsuario(email, senha);
        res.json(result);
      } catch (error) {
        console.error(error);
        res.status(401).json({ error: error.message });
      }
    }

}
  
module.exports = new usuarioController();