CREATE TABLE products (
	product_id      INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name    VARCHAR(255) NOT NULL,
    price   INT          NOT NULL 
    );



-- insertar productos
INSERT INTO products (name, price) VALUES ("Bagel de salmón", 425)
INSERT INTO products (name, price) VALUES ("Hamburguesa Clasica", 350)
INSERT INTO products (name, price) VALUES ("Sandwich Veggie", 310)
INSERT INTO products (name, price) VALUES ("Ensalada Veggie", 340)
INSERT INTO products (name, price) VALUES ("Focaccia", 300)
INSERT INTO products (name, price) VALUES ("Sandwich Focaccia", 440)
INSERT INTO products (name, price) VALUES ("Veggie Avocado", 310)
