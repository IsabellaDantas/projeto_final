const menuModel = require('../models/menuModel');

class MenuController{
    async inserirMenu(req, res){
        const {cardapio_dia} = req.body;

        try{
            const pratos_dia = await menuModel.inserirMenu(cardapio_dia);
            res.status(201).json(pratos_dia);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: error.message});
        }
    }

    async getMenu(req, res){
        try{
            const pratos_dia = await menuModel.getMenu();
            res.json(pratos_dia);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: error.message});
        }
    }

    async getPratosMenu(req, res) {
        try{
            const pratos_dia = await menuModel.getPratosMenu();
            res.json(pratos_dia);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: error.message});
        }
    }

    
}

module.exports = new MenuController();