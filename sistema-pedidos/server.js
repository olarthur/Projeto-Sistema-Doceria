// Importa dependências
const express = require('express');
const bodyParser = require('body-parser');

// Inicializando o servidor
const app = express();
const PORT = 3000;

// Configuração do body-parser para processar dados de formulários
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servindo arquivos estáticos (HTML, CSS, etc.) da pasta 'public'
app.use(express.static('public'));

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

const mysql = require('mysql2');

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',    
    user: 'root',   
    password: '080441OliveiraArthur@', 
    database: 'sistema_pedidos' 
});

// Conecta MySQL
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

app.post('/api/pedido', (req, res) => {
    const { nome, produto, telefone, mensagem } = req.body;

    // Query para inserir dados na tabela 'pedidos'
    const query = 'INSERT INTO pedidos (nome, produto, telefone, mensagem) VALUES (?, ?, ?, ?)';
    const values = [nome, produto, telefone, mensagem];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Erro ao inserir pedido:', err);
            res.status(500).json({ error: 'Erro ao processar o pedido' });
            return;
        }
        res.status(200).json({ message: 'Pedido recebido com sucesso!' });
    });
});
