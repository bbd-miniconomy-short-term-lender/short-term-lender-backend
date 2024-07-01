CREATE TABLE repayment (
    repayment_id SERIAL,
    amount MONEY NOT NULL,
    loan_status VARCHAR(20) NOT NULL
);