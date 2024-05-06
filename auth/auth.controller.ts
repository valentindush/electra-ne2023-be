import { Router } from "express";
import { login, register } from "./auth.service";
import { validateData } from "../middlewares/validate.middleware";
import { authSchema } from "./auth.schema";

const authRouter =  Router()

authRouter.post("/register", validateData(authSchema), register)
authRouter.post("/login", validateData(authSchema), login)

export default authRouter