
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(8)
);

INSERT INTO orders (user_id, status) VALUES(1,'active');
INSERT INTO orders (user_id, status) VALUES(2,'active');
INSERT INTO orders (user_id, status) VALUES(2,'complete');
INSERT INTO orders (user_id, status) VALUES(3,'complete');
INSERT INTO orders (user_id, status) VALUES(3,'active');
INSERT INTO orders (user_id, status) VALUES(1,'complete');