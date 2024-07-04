import { Router } from "express";
import { feGetLoanById, feGetLoanTable, feGetRepaymentsById, feUpdateLoanStatus } from "../handlers/fe-handler";


const router = Router();

router.get("/loan/info/:loanId", feGetLoanById);
router.get("/loan/table", feGetLoanTable);
router.get("/repayments/:loanId", feGetRepaymentsById);

router.post("/loan/status", feUpdateLoanStatus);

export {router as feRouter}
