import { Router } from "express";
import { itsThePurge } from "../handlers/management-handler";

const router = Router();

router.post("/mng/reset", itsThePurge);

export {router as managementRoutes}
