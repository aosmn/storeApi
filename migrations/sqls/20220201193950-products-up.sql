CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150),
    price INTEGER,
    category VARCHAR(150)
);

INSERT INTO products (name, price, category) VALUES('HP laptop', 12000, 'Computers');
INSERT INTO products (name, price, category) VALUES('Dell laptop', 11000, 'Computers');
INSERT INTO products (name, price, category) VALUES('Lenovo laptop', 13000, 'Computers');
INSERT INTO products (name, price, category) VALUES('HP mouse', 500, 'Computer Accessories');
