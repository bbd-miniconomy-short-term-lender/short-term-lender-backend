import { Request, Response } from "express";
import { PersonaRepository } from "../repository/PersonaRepository";
import { pool } from "../../database-connection";

export const addPersona = async (req: Request, res: Response) => {
    // bd

    const personaRepository = new PersonaRepository(pool);
    const response = await personaRepository.create(req.body);

    res.status(201).json(response);
}

export const getAllPersonas = async (_: Request, res: Response) => {
    // bd

    const personaRepository = new PersonaRepository(pool);
    const response = await personaRepository.findAll();

    res.status(200).json(response)
}

export const getPersonaById = async (req: Request, res: Response) => {
    // bd

    const persona_identifier = req.params.persona_id;

    const personaRepository = new PersonaRepository(pool);
    const response = personaRepository.findById(parseInt(persona_identifier, 10))

    res.status(200).json(response)
}