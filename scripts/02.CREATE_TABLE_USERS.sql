CREATE TABLE users (
    user_id                      INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    username                VARCHAR(255) NOT NULL UNIQUE,
    password                VARCHAR(255) NOT NULL,
    firstName               VARCHAR(255) NOT NULL,
    lastName                VARCHAR(255) NOT NULL,
    email                   VARCHAR(255) NOT NULL UNIQUE,
    phone                   INT NOT NULL,
    adress                  VARCHAR(255) NOT NULL,
    role                    INT NOT NULL DEFAULT 0
    );



INSERT INTO users VALUES (null,"lyiuuser","passworddificil","ludmila","santina","ludkapa@gmail.com",1123654789,"calle falsa 123",0)

-- por ahora el password lo guarda sin encriptar
-- verificar como se puede registrar el admin
-- USUARIO ES = 0
-- ADMIN ES = 1