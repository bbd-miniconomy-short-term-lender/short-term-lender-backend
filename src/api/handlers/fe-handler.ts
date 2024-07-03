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
        let total_paid_amount = await repaymentRepository.getTotalPaymentsByLoanId(loan_id!) ?? 0;
        
        loan!.amount = parseNumber(loan?.amount);
        loan!.monthly_repayment = parseNumber(loan?.monthly_repayment);
        loan!.interest_rate = parseNumber(loan?.interest_rate);
        total_paid_amount = parseNumber(total_paid_amount);
        loan!.persona_id = parseNumber(loan?.persona_id);

        res.status(200).json({...loan, total_paid_amount: total_paid_amount, term_months: 6});
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
            loan!.interest_rate = parseNumber(loan?.interest_rate);
            loan!.persona_id = parseNumber(loan?.persona_id);
            return {...loan, amount: parseNumber(loan?.amount.toString()), monthly_repayment: parseNumber(loan?.monthly_repayment.toString())}
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

const parseNumber = (value: number | string | undefined): number => {
    if (typeof value === 'string') {
      value = value.replace(/^[^\d]+/, '');
      value = value.replace(/,/g, '');
      return parseFloat(value);
    } else if (typeof value === 'number') {
      return value;
    } else {
      return NaN;
    }
  };

  export const feGetRepaymentsById = async (req: Request, res: Response) => {
    const loan_id = parseInt(req.params.loanId, 10);

    if (!loan_id) {
        res.status(422).json({message: "loanId should be a number"});
    }

    const repaymentRepository = new RepaymentRepository(pool);

    try {
        const repayments = await repaymentRepository.getRepaymentsById(loan_id!) ?? [];

        res.status(200).json({...repayments});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
  }