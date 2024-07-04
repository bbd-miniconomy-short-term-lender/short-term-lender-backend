import { Request, Response } from "express";
import { PersonaRepository } from "../repository/PersonaRepository";
import { pool } from "../../database-connection";
import { LoanRepository } from "../repository/LoanRepository";
import { Persona } from "../../types/persona-types";
import { Loan } from "../../types/loan-types";
import { CommercialBankRepository } from "../repository/CommercialBankRepository";
import { RetailBankRepository } from "../repository/ReatilBankRepository";
import { HandOfZeusRepository } from "../repository/HandOfZeusRepository";
import { getLoanEndDate } from "../../utils";

export const requestLoan = async (req: Request, res: Response) => {
    const persona_identifier = parseInt(req.body.personaId, 10);
    const loan_amount = parseInt(req.body.loanAmount, 10);

    const commercialBankRepository = new CommercialBankRepository();
    const retailBankRepository = new RetailBankRepository();
    const handOfZeusRepository = new HandOfZeusRepository();
    const personaRepository = new PersonaRepository(pool);
    const loanRepository = new LoanRepository(pool);

    if (!persona_identifier || !loan_amount) {
        res.status(422).json({message: "personaId and loanAmount should be a number"});
    }

    try {
        // get account balance
        const cbAccountBalance = await commercialBankRepository.getAccountBalance();

        if (cbAccountBalance.data.accountBalance < loan_amount) {
            res.status(400).json({message: "We broke fam!"});
        }

        // get interest rates
        const hozRate = await handOfZeusRepository.getLendingRate();
        const hozCurrentdate = await handOfZeusRepository.getcurrentDate(Date.now());

        // check if they exist
        let personaFromDb = await personaRepository.findById(persona_identifier);
        
        if (!personaFromDb) {
            const persona: Persona = {persona_identifier: persona_identifier};
            personaFromDb = await personaRepository.create(persona);
        }
        
        const loan: Loan = {
            persona_id: personaFromDb?.persona_id,
            amount: loan_amount,
            interest_rate: hozRate.value,
            loan_start_date: hozCurrentdate.date,
            loan_status: "Active",
            monthly_repayment: 0
        };
        
        const newLoan = await loanRepository.create(loan);
        await retailBankRepository.createDebitOrder({
            amountInMibiBBDough: newLoan.amount, 
            personaId: personaFromDb.persona_id!, 
            dayInMonth: 1, 
            endsAt: await getLoanEndDate(handOfZeusRepository, Date.now()), 
            recepient: {
                bankId: 1001,
                accountId: 'short-term-lender'
            }
        });
        
        res.status(201).json({loanId: newLoan.loan_id, message: "Loan request successful"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const requestLoanInfo = async (req: Request, res: Response) => {
    const loanRepository = new LoanRepository(pool);

    const loan_id = parseInt(req.params.loanId, 10);

    if (!loan_id) {
        res.status(422).json({message: "loanId should be a number"});
    }

    try {
        const loan = await loanRepository.findById(loan_id!);
        
        res.status(200).json({...loan, amount: loan?.amount.toString().replace("$", "D")});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const commercialBankLoanRequest = async (req: Request, res: Response) => {
    const commercialBankRepository = new CommercialBankRepository();

    try {
        const response = await commercialBankRepository.requestLoan(req.body);
        res.status(response.status).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
}
