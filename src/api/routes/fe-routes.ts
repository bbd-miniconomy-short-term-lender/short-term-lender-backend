import { Router } from "express";
import { feGetLoanById, feGetLoanTable, feGetRepaymentsById, feUpdateLoanStatus } from "../handlers/fe-handler";


const router = Router();

router.get("/fe/loan/info/:loanId", feGetLoanById);
router.get("/fe/loan/table", feGetLoanTable);
router.get("/fe/repayments/:loanId", feGetRepaymentsById);

router.post("/fe/loan/status", feUpdateLoanStatus);

export {router as feRouter}
