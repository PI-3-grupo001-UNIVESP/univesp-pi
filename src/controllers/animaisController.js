// Importa a conexão com o banco de dados que você já configurou
const db = require('../config/db'); 

// Função para buscar todos os animais
const listarAnimais = async (req, res) => {
    try {
        // Faz a mesma consulta (SELECT) que fizemos no pgAdmin
        const resultado = await db.query('SELECT * FROM animais');
        
        // Devolve o resultado em formato JSON (que é o formato padrão da web)
        res.json(resultado.rows); 
    } catch (erro) {
        console.error("Erro ao buscar animais:", erro.message);
        res.status(500).json({ erro: 'Erro interno no servidor' });
    }
};

// Exporta a função para podermos usá-la no server.js
module.exports = {
    listarAnimais
}