CREATE TABLE product_orders (
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    price INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES user_orders (order_id),
    FOREIGN KEY (product_id) REFERENCES products (product_id)
)

-- numero de orden 1 : 2 hamburguesas clasicas (id:2 $350 c/u) y 1 sandwich veggie(id:3 $310 c/u)
INSERT INTO product_orders VALUES (1,2,350)
INSERT INTO product_orders VALUES (1,2,350)
INSERT INTO product_orders VALUES (1,3,310)

CREATE TABLE product_orders (
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    CONSTRAINT FK_userOrder FOREIGN KEY (order_id),
    REFERENCES user_orders (order_id),
    CONSTRAINT FK_product FOREIGN KEY (product_id)
    REFERENCES products (product_id)
)