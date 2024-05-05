import { Request, Response } from "express";
import vine, {errors} from '@vinejs/vine'
import { schema } from "./auth.schema";
import * as Bcrypt from "bcrypt"
import {PrismaClient } from "@prisma/client";
import { generateToken } from "../utils/jwt.util";

const prisma = new PrismaClient()

const register = async (req:Request, res: Response) =>{
    const data = req.body
    try {
        const validator = vine.compile(schema)
        const output = await validator.validate(data)

        const hash = await Bcrypt.hash(output.password, 10)

        const newUser = await prisma.user.create(
            {
                data: {
                    username: output.username,
                    password: hash
                }
            }
        )

        const token = generateToken(newUser.username)

        return res.status(201).json({token: token})

    } catch (error) {
        if(error instanceof errors.E_VALIDATION_ERROR){
            return res.status(400).json({message: error.messages})
        }

        return res.status(500)
    }
}

export const login = (req: Request, res: Response) => {

}