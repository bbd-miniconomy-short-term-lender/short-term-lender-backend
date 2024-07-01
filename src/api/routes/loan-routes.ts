import { Router } from "express";
import { requestLoan, requestLoanInfo } from "../handlers/loan-handler";

const router = Router();

router.post("/loan/request", requestLoan);

router.get("/loans/info/:loanId", requestLoanInfo);
