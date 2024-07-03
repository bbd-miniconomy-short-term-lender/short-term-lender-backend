import { Request, Response } from "express";
import { PersonaRepository } from "../repository/PersonaRepository";
import { pool } from "../../database-connection";
import { LoanRepository } from "../repository/LoanRepository";
import { Persona } from "../../types/persona-types";
import { Loan } from "../../types/loan-types";
import { CommercialBankRepository } from "../repository/CommercialBankRepository";
import { LoanApplication } from "../../types/commercial-bank";

export const requestLoan = async (req: Request, res: Response) => {
    //bd

    // check if we have the funds ...
    // create a debit order with the bank
    // get interest rate
    // get date

    // then ...
    const personaRepository = new PersonaRepository(pool);
    const loanRepository = new LoanRepository(pool);


    const persona_identifier = parseInt(req.body.personaId, 10);
    const loan_amount = parseInt(req.body.loanAmount, 10);


    if (!persona_identifier || !loan_amount) {
        res.status(422).json({message: "personaId and loanAmount should be a number"});
    }


    try {
        // check if they exist
        let personaFromDb = await personaRepository.findById(persona_identifier);
        
        if (!personaFromDb) {
            const persona: Persona = {persona_identifier: persona_identifier};
            personaFromDb = await personaRepository.create(persona);
        }
        
        const loan: Loan = {
            persona_id: personaFromDb?.persona_id,
            amount: loan_amount,
            interest_rate: 0.08,
            start_date: "01|01|01"
        };
        
        const newLoan = await loanRepository.create(loan);
        
        res.status(201).json({loanId: newLoan.loan_id, message: "Loan request successful"});
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
}

export const requestLoanInfo = async (req: Request, res: Response) => {
    //bd

    const loan_id = parseInt(req.params.loanId, 10);

    if (!loan_id) {
        res.status(422).json({message: "loanId should be a number"});
    }

    const loanRepository = new LoanRepository(pool);

    try {
        const loan = await loanRepository.findById(loan_id!);
        
        res.status(200).json({...loan, amount: loan?.amount.toString().replace("$", "R")});
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
}

export const commercialBankLoanRequest = async (req: Request, res: Response) => {
    const commercialBankRepository = new CommercialBankRepository();

    try {
        const response = await commercialBankRepository.requestLoan(req.body);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
}
