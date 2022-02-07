
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE,
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE
);

INSERT INTO order_products (quantity, order_id, product_id) VALUES(12, '1', '1');
INSERT INTO order_products (quantity, order_id, product_id) VALUES(3, '2', '2');
INSERT INTO order_products (quantity, order_id, product_id) VALUES(4, '3', '2');

