CREATE TABLE repayment (
    repayment_id SERIAL PRIMARY KEY,
    loan_id BIGINT NOT NULL,
    repayment_date VARCHAR(10) NOT NULL,
    persona_id BIGINT NOT NULL,
    FOREIGN KEY (persona_id) REFERENCES persona(persona_id),
    FOREIGN KEY (loan_id) REFERENCES loan(loan_id)
);
