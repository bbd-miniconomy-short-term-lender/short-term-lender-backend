export const getAllPersonas = "SELECT * FROM persona";
export const getPersonaById = "SELECT * FROM persona WHERE persona_identifier = ($1)";
export const addPersona = "INSERT INTO persona (persona_identifier) VALUES ($1)";