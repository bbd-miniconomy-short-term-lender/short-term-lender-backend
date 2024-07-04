export const addLoan = "INSERT INTO loan (persona_id, amount, interest_rate, loan_start_date, loan_status) VALUES ($1, $2, $3, $4, $5) RETURNING *";
export const getAllLoans = "SELECT * FROM loan"
export const getLoanById = "SELECT * FROM loan WHERE loan_id = ($1)"
export const getLastLoanRecords = "SELECT * FROM loan ORDER BY loan_id DESC LIMIT $1";
export const updateStatusByLoan = "UPDATE loan SET loan_status = ($2) WHERE loan_id = ($1)";
export const checkLoanExists = "SELECT EXISTS(SELECT 1 FROM loan WHERE loan_id = ($1))";
