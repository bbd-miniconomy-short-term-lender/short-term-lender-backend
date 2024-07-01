export type Loan = {
    loan_id?: number;
    persona_id?: number;
    persona_identifier?: string;
    amount: number;
    interest_rate: number;
    start_date: string;
}