CREATE TABLE plugins_orders (id SERIAL PRIMARY KEY, order_id INTEGER NOT NULL REFERENCES orders(id), plugin_id INTEGER NOT NULL REFERENCES plugins(id), quantity INTEGER);