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

CREATE TABLE IF NOT EXISTS registos (
    id_reg bigint AUTO_INCREMENT PRIMARY KEY,
    energia double,
    time_stamp_final varchar(255),
    time_stamp_inicial varchar(255),
    tipo varchar(255),
    id_sis bigint
);

-- inserir dados na tabela dos users
 
INSERT INTO users (consumed_energy, email, first_name, last_name, pass, produced_energy, account_type)
VALUES
    (0.0, 'vitorinom@gmail.com', 'Vitorino', 'Machado', '#s5h38%2d', 0.0, 'ADMIN');

INSERT INTO users (consumed_energy, email, first_name, last_name, pass, produced_energy, account_type)
VALUES
    (0.0, 'daniel.rodrigues@gmail.com', 'Daniel', 'Rodrigues', 'familia', 0.0, 'USER');

-- inserir dados na tabela sistemas
INSERT INTO sistemas (consumed_energy, morada, potencia, produced_energy, estacao, id)
VALUES
    (0.0, 'Rua Da Alegria, 120A, Mataduços, Aveiro, 3800-025', 2100, 300, null, 2);

INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (1000, '2023-10-09 10:00:00', '2023-10-10 10:00:00', 'Prod', 1);
INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (1500, '2023-10-10 10:00:00', '2023-10-10 13:00:00', 'Prod', 1);
INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (1800, '2023-10-10 13:00:00', '2023-10-10 14:00:00', 'Prod', 1);
INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (2000, '2023-10-10 14:00:00', '2023-10-11 10:00:00', 'Prod', 1);
INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (500, '2023-10-11 10:00:00', '2023-10-12 10:00:00', 'Prod', 1);
INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (600, '2023-10-12 10:00:00', '2023-10-13 10:00:00', 'Prod', 1);
INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (200, '2023-10-13 10:00:00', '2023-10-13 21:00:00', 'Prod', 1);
INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (20, '2023-10-13 21:00:00', '2023-10-14 10:00:00', 'Prod', 1);
INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (1000, '2023-10-14 10:00:00', '2023-10-15 10:00:00', 'Prod', 1);
INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (1000, '2023-10-15 10:00:00', '2023-10-16 10:00:00', 'Prod', 1);
INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (500, '2023-10-16 10:00:00', '2023-10-17 10:00:00', 'Prod', 1);
INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (2000, '2023-10-17 10:00:00', '2023-10-18 10:00:00', 'Prod', 1);
INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (2100, '2023-10-18 10:00:00', '2023-10-19 10:00:00', 'Prod', 1);
INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (400, '2023-10-19 10:00:00', '2023-10-20 10:00:00', 'Prod', 1);
    INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (600, '2023-10-20 10:00:00', '2023-10-21 10:00:00', 'Prod', 1);
    INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (800, '2023-10-21 10:00:00', '2023-10-30 11:00:00', 'Prod', 1);
    INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (3000, '2023-10-09 10:00:00', '2023-10-10 10:00:00', 'Cons', 1);
    INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (1000, '2023-10-10 10:00:00', '2023-10-10 13:00:00', 'Cons', 1);
    INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (2000, '2023-10-10 13:00:00', '2023-10-10 14:00:00', 'Cons', 1);
    INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (400, '2023-10-10 14:00:00', '2023-10-11 10:00:00', 'Cons', 1);
    INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (600, '2023-10-11 10:00:00', '2023-10-12 10:00:00', 'Cons', 1);    
    INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (800, '2023-10-12 10:00:00', '2023-10-13 10:00:00', 'Cons', 1);
    INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (100, '2023-10-13 10:00:00', '2023-10-13 21:00:00', 'Cons', 1);
    INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (100,  '2023-10-13 21:00:00', '2023-10-14 10:00:00', 'Cons', 1);
    INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (150, '2023-10-14 10:00:00', '2023-10-15 10:00:00', 'Cons', 1);
    INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (50, '2023-10-15 10:00:00', '2023-10-16 10:00:00', 'Cons', 1);
    INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (300, '2023-10-16 10:00:00', '2023-10-17 10:00:00', 'Cons', 1);
    INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (700, '2023-10-17 10:00:00', '2023-10-18 10:00:00', 'Cons' 1);
    INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (100, '2023-10-18 10:00:00', '2023-10-19 10:00:00', 'Cons', 1);
    INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (1300, '2023-10-19 10:00:00', '2023-10-20 10:00:00', 'Cons', 1);
    INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (1500, '2023-10-20 10:00:00', '2023-10-21 10:00:00', 'Cons', 1);
    INSERT INTO registos (energia, time_stamp_final, time_stamp_inicial, tipo, id_sis)
VALUES
    (1800, '2023-10-21 10:00:00', '2023-10-30 11:00:00', 'Cons', 1);

