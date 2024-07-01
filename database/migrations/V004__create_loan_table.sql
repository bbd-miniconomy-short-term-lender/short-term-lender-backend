CREATE TABLE loan (
    loan_id SERIAL,
    amount MONEY NOT NULL,
    interest_rate DECIMAL NOT NULL,
    loan_start_date VARCHAR(10),
    FOREIGN KEY (persona_id) REFERENCES persona(persona_id)
);