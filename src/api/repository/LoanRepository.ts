import { Pool } from "pg";
import { IRepository } from "../../interfaces/generic-interface";
import { Loan } from "../../types/loan-types";
import { addLoan, getAllLoans, getLoanById } from "../queries/loan-queries";

export class LoanRepository implements IRepository<Loan> {
    private databasePool: Pool;

    constructor(pool: Pool) {
        this.databasePool = pool;
    }

    async create(loan: Loan): Promise<Loan> {
        const response = await this.databasePool.query(addLoan, [loan.persona_id, loan.amount, loan.interest_rate, loan.start_date]);
        return response.rows[0];
    }

    async findById(id: number): Promise<Loan | null> {
        const response = await this.databasePool.query(getLoanById, [id]);
        return response.rows[0] as unknown as Loan;
    }
    
    async findAll(): Promise<Loan[]> {
        const response = await this.databasePool.query(getAllLoans);
        return response.rows;
    }

}