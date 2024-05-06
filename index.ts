import { PrismaClient } from '@prisma/client'
import express, { Request, Response } from 'express'
import dotenv from "dotenv"
import authRouter from './auth/auth.controller'
import tokenRouter from './tokens/tokens.controller'

const app = express()
const PORT = 3000

dotenv.config()

const prisma = new PrismaClient()

async function main() {
    app.use(express.json())

    app.use("/api/v1/auth", authRouter)
    app.use("/api/v1/token", tokenRouter)
    app.listen(PORT, () => {
        console.log("Server up on port :" + PORT)
    })
}

main()
    .then(async () => {
        await prisma.$connect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });