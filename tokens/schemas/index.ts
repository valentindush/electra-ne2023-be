import { z } from "zod";

export const createTokenSchema = z.object({
    deviceNumber: z.string().min(8).max(8),
    amount: z.number().int().min(100).max(182500).refine(val=>val%100 === 0, {
        message:"amount must be a multiple of 100"
    })

})