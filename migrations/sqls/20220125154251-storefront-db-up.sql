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

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    password_digest VARCHAR
);

INSERT INTO users (firstName, lastName, password_digest) VALUES('John', 'Doe', 'alksal');

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    status VARCHAR(8)
);

CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    order_id BIGINT REFERENCES orders(id),
    product_id BIGINT REFERENCES products(id)
);


