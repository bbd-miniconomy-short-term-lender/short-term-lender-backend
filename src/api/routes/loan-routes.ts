import { Router } from "express";
import { commercialBankLoanRequest, requestLoan, requestLoanInfo } from "../handlers/loan-handler";
import { rateLimiter } from "../rate-limiter";

const router = Router();

router.post("/loan/request", rateLimiter(100), requestLoan);

router.get("/loans/info/:loanId", rateLimiter(1000), requestLoanInfo);

router.post("/sevices/commercial-bank/loan/request", commercialBankLoanRequest)

export {router as loanRoutes}
