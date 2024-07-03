CREATE OR REPLACE FUNCTION calculate_monthly_repayments()
RETURNS TRIGGER AS $$
BEGIN
    NEW.monthly_repayment := (NEW.amount * NEW.interest_rate * POWER(1 + NEW.interest_rate, 6)) / (POWER(1 + NEW.interest_rate, 6) - 1);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE loan (
    loan_id SERIAL PRIMARY KEY,
    amount MONEY NOT NULL,
    interest_rate DECIMAL NOT NULL,
    loan_start_date VARCHAR(10) NOT NULL,
    monthly_repayment MONEY NOT NULL,
    loan_status VARCHAR(10) NOT NULL,
    persona_id BIGINT NOT NULL,  -- Assuming you have a persona_id column for foreign key constraint
    FOREIGN KEY (persona_id) REFERENCES persona(persona_id)
);


