// app.js (Arquivo principal)

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// configuracao banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'niceplanet_db'
});

// conectando banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});

app.use(bodyParser.json());

// rotas
app.post('/login', (req, res) => {
  // autenticacao
});

app.post('/cadastro', (req, res) => {
  // cadastro
});

app.get('/produtor/:id', (req, res) => {
  // busca por produtor
});

app.get('/propriedade/:id', (req, res) => {
  // busca por propriedade
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
