import { Pool } from "pg";
import { IRepository } from "../../interfaces/generic-interface";
import { Persona } from "../../types/persona-types";
import { addPersona, getAllPersonas, getPersonaById } from "../queries/persona-queries";

export class PersonaRepository implements IRepository<Persona> {
    private databasePool: Pool;

    constructor(pool: Pool) {
        this.databasePool = pool;
    }

    async create(persona: Persona): Promise<Persona> {
        const response = await this.databasePool.query(addPersona, [persona.persona_identifier]);
        return response.rows[0];
    }

    async findById(id: number): Promise<Persona | null> {
        // validate id
        const response = await this.databasePool.query(getPersonaById, [id])
        return response.rows as Persona
    }

    async findAll(): Promise<Persona[]> {
        const response = await this.databasePool.query(getAllPersonas)
        return response.rows
    }
}
