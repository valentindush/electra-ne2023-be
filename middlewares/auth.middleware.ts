import {Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.util";
import { PrismaClient } from "@prisma/client";

declare global {
    namespace Express {
        interface Request {
            username?: string;
            user_id: number
        }
    }
}

interface DecodedJwtPayload {
    [key: string]: any;
}

const prisma = new PrismaClient()

export const authMiddleware = async (req:Request, res: Response, next: NextFunction) =>{

    const authHeader = req.headers.authorization
    const token = authHeader?.split(" ")[1]
    const data = verifyToken(token ?? "") as DecodedJwtPayload
    if (data === null) {
        return res.status(403).json({ message: "Invalid Token" })
    }

    const user = await prisma.user.findUnique({
        where: {
            username: `${data["username"]}`
        }
    })

    if(!user){
        return res.status(403).json({ message: "Invalid Token" })
    }

    req.username = `${user.username}`
    req.user_id = user.id
    next()
    
}