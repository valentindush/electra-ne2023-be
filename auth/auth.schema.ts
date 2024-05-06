import {z} from 'zod'

export const authSchema = z.object({
    username: z.string().trim().min(3).max(20),
    password: z.string().min(8).max(36)
})
