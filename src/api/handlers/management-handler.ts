import { Request, Response } from "express";

export const itsThePurge = async (req: Request, res: Response) => {
    try {
        res.status(201).json({message: "The purge has begun... eerie screams can be heard off in the distance..."});
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
}
