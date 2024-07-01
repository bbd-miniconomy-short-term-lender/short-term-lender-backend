import { Request, Response } from "express";
import { PersonaRepository } from "../repository/PersonaRepository";
import { pool } from "../../database-connection";
import { LoanRepository } from "../repository/LoanRepository";
import { Persona } from "../../types/persona-types";
import { Loan } from "../../types/loan-types";

export const requestLoan = async (req: Request, res: Response) => {
    //bd

    // check if we have the funds ...
    // create a debit order with the bank

    // then ...
    const personaRepository = new PersonaRepository(pool);
    const loanRepository = new LoanRepository(pool);

    const persona: Persona = {persona_identifier: req.body.personaId};
    const newPersona = await personaRepository.create(persona);
    
    const loan: Loan = {
        persona_id: newPersona.id,
        amount: req.body.loanAmount,
        interest_rate: 0.08,
        start_date: "01|01|01"
    };
    const newLoan = await loanRepository.create(loan);

    // response
    res.status(200).json({loanId: newLoan.loan_id, message: "Loan request successful."})
}

export const requestLoanInfo = async (req: Request, res: Response) => {
    //bd

    const loan_id = parseInt(req.params.loanId, 10);

    const loanRepository = new LoanRepository(pool);
    const loan = await loanRepository.findById(loan_id);

    res.status(200).json(loan);
}