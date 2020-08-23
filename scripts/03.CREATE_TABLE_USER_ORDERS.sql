CREATE TABLE user_orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    -- date DATETIME NOT NULL DEFAULT GETDATE()
    datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL DEFAULT "Nuevo",
    items_quantity INT NOT NULL DEFAULT 1,
    -- payment_method VARCHAR(50) NOT NULL,
    -- order_price INT NOT NULL,
    user_id INT NOT NULL,
    delivery_adress VARCHAR(255) NOT NULL,
    CONSTRAINT FK_userOrder FOREIGN KEY (user_id)
    REFERENCES users (user_id)
    -- FOREIGN KEY (user_id) REFERENCES users (user_id)

)

INSERT INTO user_orders (items_quantity, payment_method, order_price, user_id, adress) VALUES (3,"tarjeta",1010,1,"calle false 123")


-- consulta devuelve numero de pedido con nombre del usuario que realizo el pedido y fecha
SELECT user_orders.order_id, users.firstName, user_orders.datetime
FROM user_orders
INNER JOIN users on user_orders.user_id=users.user_id

-- la consulta devuelve el nombre de los productos en cada pedido
SELECT product_orders.order_id, products.name
FROM product_orders
INNER JOIN products on product_orders.product_id=products.product_id


CREATE TABLE user_orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL DEFAULT "Nuevo",
    items_quantity INT NOT NULL DEFAULT 1,
    payment INT NOT NULL,
    user INT NOT NULL,
    delivery_adress VARCHAR(255) NOT NULL,
    CONSTRAINT FK_userOrder FOREIGN KEY (user)
    REFERENCES users (user_id),
    CONSTRAINT FK_paymentOrder FOREIGN KEY (payment)
    REFERENCES payments (payment_id)

)