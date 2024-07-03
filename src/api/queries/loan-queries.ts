export const addLoan = "INSERT INTO loan (persona_id, amount, interest_rate, loan_start_date) VALUES ($1, $2, $3, $4) RETURNING *";
export const getAllLoans = "SELECT * FROM loan"
export const getLoanById = "SELECT * FROM loan WHERE loan_id = ($1)"