-- Create the trigger to automatically calculate monthly_repayment
CREATE TRIGGER calculate_monthly_repayments_trigger
BEFORE INSERT ON loan
FOR EACH ROW
EXECUTE FUNCTION calculate_monthly_repayments();


CREATE OR REPLACE FUNCTION calculate_total_paid_amount(p_loan_id INT)
RETURNS MONEY AS $$
DECLARE
    v_total_paid MONEY;
BEGIN
    SELECT SUM(l.monthly_repayment)
    INTO v_total_paid
    FROM loan l
    JOIN repayment r ON l.loan_id = r.loan_id
    WHERE l.loan_id = p_loan_id;

    RETURN v_total_paid;
END;
$$ LANGUAGE plpgsql;