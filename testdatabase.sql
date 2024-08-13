-- criando banco de dados
CREATE DATABASE niceplanet_db;

USE niceplanet_db;

-- criando tabela Produtor
CREATE TABLE Produtor (
    idProdutor INT AUTO_INCREMENT PRIMARY KEY,
    nomeProdutor VARCHAR(255) NOT NULL,
    cpfProdutor VARCHAR(14) NOT NULL UNIQUE -- Armazenar CPF formatado (com pontos e traço)
);

-- criando tabela Propriedade
CREATE TABLE Propriedade (
    idPropriedade INT AUTO_INCREMENT PRIMARY KEY,
    nomePropriedade VARCHAR(255) NOT NULL,
    cadastroRural VARCHAR(255) NOT NULL,
    idProdutor INT NOT NULL,
    FOREIGN KEY (idProdutor) REFERENCES Produtor(idProdutor)
);

-- criando tabela Usuario
CREATE TABLE Usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nomeUsuario VARCHAR(255) NOT NULL UNIQUE,
    senhaUsuario VARCHAR(255) NOT NULL -- Armazenar o hash da senha
);
