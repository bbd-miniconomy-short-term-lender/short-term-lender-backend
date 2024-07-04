export const getTotalRepayments = 'SELECT calculate_total_paid_amount($1) AS total_paid';
export const getRepaymentsById = 'SELECT * FROM repayment WHERE loan_id = ($1) LIMIT 10';
export const getAllRepayments = 'SELECT * FROM repayment';