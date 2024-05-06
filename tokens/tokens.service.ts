import { Request, Response } from "express";
import { generateElectricityToken } from "../utils/tokens.util";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const createToken = async (req: Request, res: Response) => {
    const { deviceNumber, amount } = req.body
    const { token, expiryDate } = generateElectricityToken(deviceNumber, amount)

    console.log(req.user_id)

    try {
        const newTokenRecord = await prisma.token.create({
            data: {
                token: token,
                deviceNumber: `${deviceNumber}`,
                expiryDate: expiryDate,
                userId: req.user_id
            }
        })
        console.log("saved...")
        return res.status(201).json({ newTokenRecord })

    } catch (error) {
        return res.status(500)
    }
}

export const getTokens  = async (req: Request, res: Response)=>{
    const deviceNumber: string = req.params.device
    
    if(deviceNumber.length < 8){
        return res.status(400).json({message: "device should be 8 digits"})
    }

    try {
        const tokens = await prisma.token.findMany({
            where: {
                userId: req.user_id,
                deviceNumber: deviceNumber
            }
        })

        return res.json(tokens)
    } catch (error) {
        return res.status(500)
    }

}