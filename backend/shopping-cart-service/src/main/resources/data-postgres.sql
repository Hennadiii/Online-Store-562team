INSERT INTO shopping_cart (user_id, total_price) VALUES
                                                     (1, 0.0),
                                                     (2, 0.0),
                                                     (3, 0.0);

INSERT INTO cart_item (shopping_cart_id, product_id, quantity, price) VALUES
                                                                          (1, 101, 2, 50.0), -- Кошик користувача 1
                                                                          (1, 102, 1, 20.0),
                                                                          (2, 103, 3, 30.0), -- Кошик користувача 2
                                                                          (3, 104, 5, 10.0); -- Кошик користувача 3


INSERT INTO users (username, email, password) VALUES
                                                  ('john_doe', 'john@example.com', 'hashed_password_1'),
                                                  ('jane_smith', 'jane@example.com', 'hashed_password_2'),
                                                  ('admin_user', 'admin@example.com', 'hashed_password_3');

INSERT INTO product (name, description, price, stock_quantity) VALUES
                                                                   ('Chair', 'Comfortable wooden chair', 50.0, 100),
                                                                   ('Table', 'Dining table for six people', 150.0, 50),
                                                                   ('Sofa', 'Stylish and modern sofa', 300.0, 20),
                                                                   ('Lamp', 'Desk lamp with adjustable brightness', 25.0, 200);
