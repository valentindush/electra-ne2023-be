import {Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.util";

export const authMiddleware = (req:Request, res: Response, next: NextFunction) =>{

    const authHeader = req.headers.authorization

    if(!authHeader?.startsWith("Bearer")){
        res.status(403).json({message: "Invalid Token"})
    }

    const token = authHeader?.split(" ")[1]
    const username = verifyToken(token??"")
    if(username === null){
        res.status(402).json({message: "Invalid Token"})
    }
    
}