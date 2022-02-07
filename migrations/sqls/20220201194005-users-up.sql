
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    password_digest VARCHAR
);

INSERT INTO users (username, firstName, lastName, password_digest) VALUES('johndoe','John', 'Doe', '$2b$10$xsGOodlCAporHMXtkcwQrOX9uq0C5KuOf8ApTxucaknyroLf4zDXS');
INSERT INTO users (username, firstName, lastName, password_digest) VALUES('janedoe','Jane', 'Doe', '$2b$10$xsGOodlCAporHMXtkcwQrOX9uq0C5KuOf8ApTxucaknyroLf4zDXS');
INSERT INTO users (username, firstName, lastName, password_digest) VALUES('janadoe','Joana', 'Doe', '$2b$10$xsGOodlCAporHMXtkcwQrOX9uq0C5KuOf8ApTxucaknyroLf4zDXS');
