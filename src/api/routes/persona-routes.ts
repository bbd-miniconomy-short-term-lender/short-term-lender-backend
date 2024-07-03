import { Router } from "express"
import { addPersona, getAllPersonas, getPersonaById } from "../handlers/persona-handler";

const router = Router();

router.post("/persona", addPersona)

router.get("/persona/:persona_identifier", getPersonaById)
router.get("/persona", getAllPersonas)