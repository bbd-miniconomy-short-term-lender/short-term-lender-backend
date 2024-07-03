import { Pool } from "pg";
import { IRepository } from "../../interfaces/generic-interface";
import { Repayment } from "../../types/repayment-types";
import { getRepaymentsById, getTotalRepayments } from "../queries/repayment-queries";

export class RepaymentRepository implements IRepository<Repayment> {
    private databasePool: Pool;

    constructor(pool: Pool) {
        this.databasePool = pool;
    }
    create(object: Repayment): Promise<Repayment> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Repayment[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Repayment | null> {
        throw new Error("Method not implemented.");
    }

    async getTotalPaymentsByLoanId(loan_id: number): Promise<number | null> {
        const response = await this.databasePool.query(getTotalRepayments, [loan_id]);
        return response.rows[0].total_paid;
    }

    async getRepaymentsById(loan_id: number): Promise<Repayment[] | null> {
        const response = await this.databasePool.query(getRepaymentsById, [loan_id]);
        return response.rows;
    }

}