// Importando as ferramentas
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Sua conexão com o banco

// Importando o controller
const animaisController = require('./controllers/animaisController');

// Iniciando o aplicativo
const app = express();

// Configurações
app.use(cors()); // Permite o frontend conectar
app.use(express.json()); // Permite o backend entender JSON

// ==========================
// ROTAS DA NOSSA API
// ==========================

// Uma rota de teste inicial
app.get('/', (req, res) => {
    res.send('Backend de Doação de Animais está rodando! 🐶🐱');
});

// Rota para listar todos os animais (Método GET)
app.get('/animais', animaisController.listarAnimais);

// ==========================
// INICIANDO O SERVIDOR
// ==========================
const PORTA = process.env.PORT || 3000;
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
    module.exports= app;
});