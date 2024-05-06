import { Request, Response } from "express";
import * as Bcrypt from "bcrypt"
import {PrismaClient } from "@prisma/client";
import { generateToken } from "../utils/jwt.util";

const prisma = new PrismaClient()

export const register = async (req:Request, res: Response) =>{
    const data = req.body
    try {

        const hash = await Bcrypt.hash(`${data.password}`, 10)

        const newUser = await prisma.user.create(
            {
                data: {
                    username: `${data.username}`,
                    password: hash
                }
            }
        )

        const token = generateToken(newUser.username)

        return res.status(201).json({token: token})

    } catch (error) {
        return res.status(500)
    }
}

export const login = async (req: Request, res: Response) => {
    const data = req.body
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: `${data.username}`
            }
        })

        if(!user){
            return res.status(400).json({message: "invalid credentials"})
        }

        const isPasswordValid = await Bcrypt.compare(`${data.password}`, user.password??"")

        if(!isPasswordValid){
            return res.status(400).json({message: "invalid credentials"})
        }

        const token = generateToken(`${data.username}`)

        return res.json({token})

    } catch (error) {
        return res.status(500)
    }
}