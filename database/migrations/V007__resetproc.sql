-- Detelete reset
CREATE OR REPLACE PROCEDURE delete_all_rows()
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM crspayment;
    DELETE FROM repayment;
    DELETE FROM loan;
    DELETE FROM persona;
END;
$$;