export const getTotalRepayments = 'SELECT calculate_total_paid_amount($1) AS total_paid';
export const getRepaymentsById = 'SELECT * FROM repayment ORDER BY loan_id DESC LIMIT 10';
