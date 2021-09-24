/**
 * Required External Modules and Interfaces
 */
 import express, { Request, Response } from "express";
 import { encodeSession } from "./session.service"

 const TOKEN_KEY: string = process.env.TOKEN_KEY as string;

/**
 * Router Definition
 */
export const sessionRouter = express.Router();

/**
 * Controller Definitions
 */

// POST login
// Set up an HTTP Post listener at /sessions, which will "log in" the caller and return a JWT 
sessionRouter.post("/login", (req: Request, res: Response) => {
    // This route is unprotected, anybody can call it
    // TODO: Validate username/password
    const session = encodeSession(TOKEN_KEY, {
        id: new Date().valueOf(),
        username: "test user",
        dateCreated: Date.now()        
    });
    
    res.status(201).json(session);
});