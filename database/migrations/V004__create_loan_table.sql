CREATE OR REPLACE FUNCTION calculate_monthly_repayments()
RETURNS TRIGGER AS $$
BEGIN
    NEW.monthly_repayment := (NEW.loan_amount * NEW.interest_rate * POWER(1 + NEW.interest_rate, 6)) / (POWER(1 + NEW.interest_rate, 6) - 1);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE loan_table (
    loan_id SERIAL PRIMARY KEY,
    loan_amount MONEY NOT NULL,
    interest_rate DECIMAL NOT NULL,
    loan_start_date DATE NOT NULL,
    monthly_repayment MONEY NOT NULL,
    loan_status VARCHAR(50) NOT NULL,
    persona_id INT NOT NULL,  -- Assuming you have a persona_id column for foreign key constraint
    FOREIGN KEY (persona_id) REFERENCES persona(persona_id)
);

-- Create the trigger to automatically calculate monthly_repayment
CREATE TRIGGER calculate_monthly_repayments_trigger
BEFORE INSERT ON loan_table
FOR EACH ROW
EXECUTE FUNCTION calculate_monthly_repayments();


CREATE OR REPLACE FUNCTION calculate_total_paid_amount(p_loan_id INT)
RETURNS MONEY AS $$
DECLARE
    v_total_paid MONEY;
BEGIN
    SELECT SUM(l.monthly_repayment)
    INTO v_total_paid
    FROM loan_table l
    JOIN repayment r ON l.loan_id = r.loan_id
    WHERE l.loan_id = p_loan_id;

    RETURN v_total_paid;
END;
$$ LANGUAGE plpgsql;
