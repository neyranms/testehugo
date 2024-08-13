// app.js

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// ... (configuração do banco de dados)

app.use(bodyParser.json());

// Função para verificar o token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (token == null) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, 'sua_chave_secreta', (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }

    req.user = user; // Armazenar o usuário decodificado do token na requisição
    next();
  });
}

// Rotas

// Login (sem autenticação)
app.post('/login', (req, res) => {
  // ... (lógica de login - mesma do exemplo anterior)
});

// Cadastro (requer autenticação)
app.post('/cadastro', authenticateToken, (req, res) => {
  // ... (lógica de cadastro - agora com req.user disponível)
});

// Busca por Produtor (requer autenticação)
app.get('/produtor/:id', authenticateToken, (req, res) => {
  // ... (lógica de busca por produtor - agora com req.user disponível)
});

// Busca por Propriedade (requer autenticação)
app.get('/propriedade/:id', authenticateToken, (req, res) => {
  // ... (lógica de busca por propriedade - agora com req.user disponível)
});

// ... (outras rotas)

app.listen(port, () => {
  // ...
});
