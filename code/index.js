const express = require('express');
const cors = require('cors');
const app = express();

//importando todos os arquivos de rotas
const usuarioRoutes = require('./src/routes/usuarioRoutes.js');
const pratosRoutes = require('./src/routes/pratosRoutes');
const authRoutes = require('./src/routes/authRoutes');
const compraRoutes = require('./src/routes/compraRoutes');
const menuRoutes = require('./src/routes/menuRoutes'); 

app.use(express.json());
app.use(cors('*'));

app.use('/', usuarioRoutes);
app.use('/', pratosRoutes);
app.use('/', authRoutes);
app.use('/', compraRoutes);
app.use('/', menuRoutes);

const port = 3000;
app.listen(port, () => {
    console.log("Server is running on port " + port);
}); 