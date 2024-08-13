// app.js

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // hash de senhas
const jwt = require('jsonwebtoken'); // tokens

const app = express();
const port = 3000;

// configuracao banco de dados
const connection = mysql.createConnection({
  // ... (suas credenciais)
});

connection.connect((err) => {
  // ... (tratamento de erro de conexão)
});

app.use(bodyParser.json());

// Rotas

// Login
app.post('/login', (req, res) => {
  const { nomeUsuario, senhaUsuario } = req.body;

  // Consulta SQL para buscar o usuário pelo nome de usuário
  const query = 'SELECT * FROM Usuario WHERE nomeUsuario = ?';
  connection.query(query, [nomeUsuario], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const usuario = results[0];

    // Comparar a senha fornecida com o hash armazenado no banco de dados
    bcrypt.compare(senhaUsuario, usuario.senhaUsuario, (err, result) => {
      if (err || !result) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }

      // Gerar um token JWT (opcional)
      const token = jwt.sign({ idUsuario: usuario.idUsuario }, 'sua_chave_secreta', { expiresIn: '1h' });

      res.json({ token }); // Ou enviar outras informações relevantes do usuário
    });
  });
});

// Cadastro de Produtor e Propriedade
app.post('/cadastro', (req, res) => {
  // ... (verificar autenticação do usuário, se necessário)

  const { nomeProdutor, cpfProdutor, nomePropriedade, cadastroRural } = req.body;

  // Validação dos dados (opcional, mas recomendado)
  // ...

  // Consultas SQL para inserir o produtor e a propriedade
  connection.query('INSERT INTO Produtor (nomeProdutor, cpfProdutor) VALUES (?, ?)', [nomeProdutor, cpfProdutor], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao cadastrar produtor' });
    }

    const idProdutor = result.insertId;

    connection.query('INSERT INTO Propriedade (nomePropriedade, cadastroRural, idProdutor) VALUES (?, ?, ?)', [nomePropriedade, cadastroRural, idProdutor], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao cadastrar propriedade' });
      }

      res.json({ message: 'Produtor e propriedade cadastrados com sucesso!' });
    });
  });
});

// Busca por Produtor
app.get('/produtor/:id', (req, res) => {
  const idProdutor = req.params.id;

  // Consulta SQL para buscar o produtor e suas propriedades
  const query = `
    SELECT 
      p.idProdutor, p.nomeProdutor, p.cpfProdutor,
      pr.idPropriedade, pr.nomePropriedade, pr.cadastroRural
    FROM Produtor p
    LEFT JOIN Propriedade pr ON p.idProdutor = pr.idProdutor
    WHERE p.idProdutor = ?
  `;

  connection.query(query, [idProdutor], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Produtor não encontrado' });
    }

    // Formatar os resultados para incluir as propriedades em um array
    const produtor = {
      idProdutor: results[0].idProdutor,
      nomeProdutor: results[0].nomeProdutor,
      cpfProdutor: results[0].cpfProdutor,
      propriedades: results.map(row => ({
        idPropriedade: row.idPropriedade,
        nomePropriedade: row.nomePropriedade,
        cadastroRural: row.cadastroRural
      }))
    };

    res.json(produtor);
  });
});

// Busca por Propriedade (similar à busca por produtor)
// ...

app.listen(port, () => {
  // ...
});
