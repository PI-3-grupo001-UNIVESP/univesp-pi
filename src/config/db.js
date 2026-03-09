const { Pool } = require('pg');
require('dotenv').config();

// Cria a conexão usando os dados do arquivo .env
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

// Testa a conexão logo ao iniciar
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Erro ao conectar ao banco de dados:', err.stack);
    }
    console.log('Conectado ao PostgreSQL com sucesso!');
    release();
});

module.exports = pool;