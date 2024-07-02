CREATE TABLE crspayment (
    payment_id SERIAL PRIMARY KEY,
    monthly_profit MONEY NOT NULL,
    tax_payed MONEY NOT NULL,
    payment_date VARCHAR(10) NOT NULL
);
