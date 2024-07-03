import { Router } from "express";
import { feGetLoanById, feGetLoanTable, feUpdateLoanStatus } from "../handlers/fe-handler";


const router = Router();

router.get("/fe/loan/info:loanId", feGetLoanById);
router.get("/fe/loan/info/table", feGetLoanTable);

router.post("/fe/loan/status", feUpdateLoanStatus);

export {router as feRouter}
