import { Router } from "express";
import { createToken, getTokens } from "./tokens.service";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateData } from "../middlewares/validate.middleware";
import { createTokenSchema } from "./schemas";

const tokenRouter = Router()
tokenRouter.post('/create-token', authMiddleware, validateData(createTokenSchema), createToken)
tokenRouter.get('/:device', authMiddleware, getTokens)

export default tokenRouter