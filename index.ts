import { PrismaClient } from '@prisma/client'
import express, { Request, Response } from 'express'
const prisma = new PrismaClient()

const app = express()
const PORT = 3000

async function main() {
    app.use(express.json())
    app.use("/api/v1/")

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