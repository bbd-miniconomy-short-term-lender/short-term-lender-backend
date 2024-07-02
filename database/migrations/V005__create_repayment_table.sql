CREATE TABLE repayment (
    repayment_id SERIAL PRIMARY KEY,
    loan_id BIGINT NOT NULL,
    amount MONEY NOT NULL,
    loan_status VARCHAR(20) NOT NULL,
    FOREIGN KEY (loan_id) REFERENCES loan(loan_id)
);
