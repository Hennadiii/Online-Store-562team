DROP TABLE IF EXISTS shopping_cart CASCADE;
DROP TABLE IF EXISTS cart_item CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS product CASCADE;


CREATE TABLE shopping_cart (
                               id SERIAL PRIMARY KEY,
                               user_id BIGINT NOT NULL,
                               created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                               total_price DOUBLE PRECISION NOT NULL DEFAULT 0.0
);

CREATE TABLE cart_item (
                           id SERIAL PRIMARY KEY,
                           shopping_cart_id BIGINT NOT NULL,
                           product_id BIGINT NOT NULL,
                           quantity INTEGER NOT NULL DEFAULT 1,
                           price DOUBLE PRECISION NOT NULL,
                           FOREIGN KEY (shopping_cart_id) REFERENCES shopping_cart (id) ON DELETE CASCADE
);

CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       username VARCHAR(50) NOT NULL UNIQUE,
                       email VARCHAR(100) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product (
                         id SERIAL PRIMARY KEY,
                         name VARCHAR(100) NOT NULL,
                         description TEXT,
                         price DOUBLE PRECISION NOT NULL CHECK (price >= 0),
                         stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
                         created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
