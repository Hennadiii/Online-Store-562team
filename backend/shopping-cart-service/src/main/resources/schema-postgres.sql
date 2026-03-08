CREATE TABLE IF NOT EXISTS shopping_cart
(
    id           SERIAL PRIMARY KEY,
    user_id      BIGINT,
    created_date TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total_price  DOUBLE PRECISION NOT NULL DEFAULT 0.0
);

CREATE TABLE IF NOT EXISTS cart_item
(
    id               SERIAL PRIMARY KEY,
    shopping_cart_id BIGINT           NOT NULL,
    product_id       BIGINT           NOT NULL,
    quantity         INTEGER          NOT NULL DEFAULT 1,
    price            DOUBLE PRECISION NOT NULL,
    FOREIGN KEY (shopping_cart_id) REFERENCES shopping_cart (id) ON DELETE CASCADE
);