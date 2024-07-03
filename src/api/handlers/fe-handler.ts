import { Request, Response } from "express";
import { LoanRepository } from "../repository/LoanRepository";
import { pool } from "../../database-connection";
import { Loan } from "../../types/loan-types";
import { RepaymentRepository } from "../repository/RepaymentRepository";

const NUM_RECORDS_TO_LOAD = 25;

export const feGetLoanById = async (req: Request, res: Response) => {
    const loan_id = parseInt(req.params.loanId, 10);

    if (!loan_id) {
        res.status(422).json({message: "loanId should be a number"});
    }

    const loanRepository = new LoanRepository(pool);
    const repaymentRepository = new RepaymentRepository(pool);

    try {
        const loan = await loanRepository.findById(loan_id!);
        const total_paid_amount = await repaymentRepository.getTotalPaymentsByLoanId(loan_id!);
        
        res.status(200).json({...loan, amount: loan?.amount.toString().replace("$", "R"), monthly_repayment: loan?.monthly_repayment.toString().replace("$", "R"), total_paid_amount: total_paid_amount?.toString().replace("$", "R"), term_months: 6});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const feGetLoanTable = async (req: Request, res: Response) => {
    const loanRepository = new LoanRepository(pool);

    try {
        const loans: Loan[] = await loanRepository.getLoanRecords(NUM_RECORDS_TO_LOAD);
        res.status(200).json(loans.map(loan => {
            return {...loan, amount: loan?.amount.toString().replace("$", "R")}
        }));
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const feUpdateLoanStatus = async (req: Request, res: Response) => {
    // const loan_id = parseInt(req.params.loanId, 10);

    // if (!loan_id) {
    //     res.status(422).json({message: "loanId should be a number"});
    // }

    // const loanRepository = new LoanRepository(pool);

    // try {
    //     const loan = await loanRepository.findById(loan_id!);
        
    //     res.status(200).json({...loan, amount: loan?.amount.toString().replace("$", "R")});
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({message: "Internal server error"});
    // }
}