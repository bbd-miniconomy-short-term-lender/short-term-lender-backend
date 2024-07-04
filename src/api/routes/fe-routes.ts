import { Router } from "express";
import { feGetLoanById, feGetLoanTable, feGetRepaymentsById, feUpdateLoanStatus, feGetLendingRate } from "../handlers/fe-handler";


const router = Router();

router.get("/loan/info/:loanId", feGetLoanById);
router.get("/loan/table", feGetLoanTable);
router.get("/repayments/:loanId", feGetRepaymentsById);
router.get("/fe/lending-rate", feGetLendingRate);

router.post("/loan/status", feUpdateLoanStatus);

export {router as feRouter}
