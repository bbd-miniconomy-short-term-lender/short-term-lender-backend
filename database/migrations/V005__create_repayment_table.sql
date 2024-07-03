CREATE TABLE repayment (
    repayment_id SERIAL PRIMARY KEY,
    loan_id INT NOT NULL,
    repayment_date DATE NOT NULL,
    persona_id INT,
    FOREIGN KEY (persona_id) REFERENCES persona(persona_id)
    FOREIGN KEY (loan_id) REFERENCES loan_table(loan_id)
);
