CREATE TABLE repayment (
    repayment_id SERIAL PRIMARY KEY,
    amount MONEY NOT NULL,
    loan_status VARCHAR(20) NOT NULL
);
