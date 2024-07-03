import { Request, Response } from "express";
import { LoanRepository } from "../repository/LoanRepository";
import { pool } from "../../database-connection";

export const itsThePurge = async (req: Request, res: Response) => {
    try {
        const loanRepository = new LoanRepository(pool);
        await loanRepository.prugeBabyPurge();
        console.log('Someone called purge...');
        res.status(200).json({ message: "The purge has begun... eerie screams can be heard off in the distance..." });
    } catch (error) {
        res.status(500).json({ message: "Internal server error - so sorry Sam." });
    }
}
