// Importando dependências
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