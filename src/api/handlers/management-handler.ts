import { Request, Response } from "express";
import { LoanRepository } from "../repository/LoanRepository";
import { pool } from "../../database-connection";
import { RevenueServiceRepository } from "../repository/RevenueServiceRepository";
import { HandOfZeusRepository } from "../repository/HandOfZeusRepository";
import cron from 'node-cron';

export const itsThePurge = async (req: Request, res: Response) => {
    try {
        const loanRepository = new LoanRepository(pool);
        const revenueServiceRepository = new RevenueServiceRepository();
        const handOfZeusRepository = new HandOfZeusRepository();

        await loanRepository.prugeBabyPurge();
        console.log('Someone called purge...');

        const registerResponse = await revenueServiceRepository.register({businessName: 'short-term-lender'});

        
        cron.schedule('0 */12 * * *', async () => {
            const date = await handOfZeusRepository.getcurrentDate(Date.now());

            const paymentsData = await loanRepository.findAll();

            const totalLoans = paymentsData.filter((loan) => loan.start_date.slice(8, 10) === date.date.slice(8, 10));

            const sumOfLoans = totalLoans.map((loan) => loan.amount).reduce((curr, nxt) => curr + nxt, 0);
            const sumOfRepayments = totalLoans.map((loan) => loan.monthly_repayment * 6).reduce((curr, nxt) => curr + nxt, 0);

            const profit = sumOfRepayments - sumOfLoans;

            const taxResponse = await revenueServiceRepository.calculateTax({amount: profit, taxType: "INCOME"});
            const invoiceResponse =  await revenueServiceRepository.creatTaxInvoice({taxId: registerResponse.taxId, amount: taxResponse.taxAmount, taxType: "INCOME"});
            await revenueServiceRepository.submitPaymentNotice({taxId: registerResponse.taxId, paymentId: invoiceResponse.paymentId, callbackUrl: '/callback'});
        });

        res.status(200).json({ message: "The purge has begun... eerie screams can be heard off in the distance..." });
    } catch (error) {
        res.status(500).json({ message: "Internal server error - so sorry Sam." });
    }
}
