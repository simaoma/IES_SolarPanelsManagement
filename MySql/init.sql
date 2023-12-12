USE solarlinkdb;

-- Cria a tabela dos users
CREATE TABLE IF NOT EXISTS users (
    id bigint AUTO_INCREMENT PRIMARY KEY,
    consumed_energy bigint, 
    email varchar(255), 
    first_name varchar(255), 
    last_name varchar(255), 
    pass varchar(255), 
    produced_energy bigint, 
    account_type varchar(255)
);

-- Cria a tabela dos sistemas
CREATE TABLE IF NOT EXISTS sistemas (
    id_sis bigint AUTO_INCREMENT PRIMARY KEY,
    consumed_energy double,
    morada varchar(255),
    potencia int,
    produced_energy double,
    estacao varbinary(255),
    id bigint
);

-- inserir dados na tabela dos users
 
INSERT INTO users (consumed_energy, email, first_name, last_name, pass, produced_energy, account_type)
VALUES
    (0.0, 'vitorinom@gmail.com', 'Vitorino', 'Machado', '#s5h38%2d', 0.0, 'ADMIN');

INSERT INTO users (consumed_energy, email, first_name, last_name, pass, produced_energy, account_type)
VALUES
    (0.0, 'daniel.rodrigues@gmail.com', 'Daniel', 'Rodrigues', 'familia', 0.0, 'USER');

-- inserir dados na tabela sistemas
INSERT INTO sistemas (consumed_energy, morada, potencia, produced_energy, estacoes, id)
VALUES
    (0.0, 'Rua Da Alegria, 120A, Mataduços, Aveiro, 3800-025', 2100, 300, null, 1);

