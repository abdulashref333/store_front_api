CREATE TABLE IF NOT EXISTS orders(
    order_id SERIAL PRIMARY KEY NOT NULL,
    customer_id BIGINT NOT NULL REFERENCES users(id),
    total DECIMAL(12,2) NOT NULL,
    billing_address_id VARCHAR(11) NOT NULL,
    order_status VARCHAR(100),
    payment_type VARCHAR(40) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);