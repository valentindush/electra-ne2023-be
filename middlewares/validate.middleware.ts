import { NextFunction, Response, Request } from "express";
import { z, ZodError } from "zod";

export const validateData = (schema: z.ZodObject<any, any>) => {

    return (req:Request, res: Response, next: NextFunction)=>{
        try{
            schema.parse(req.body)
            next()
        }catch(err){
            if(err instanceof ZodError){
                const errorMessages = err.errors.map((issue: any)=>(
                    `${issue.path.join('.')} is ${issue.message}`
                ))
                res.status(400).json({message: errorMessages})
            }else{
                res.status(500)
            }
        }
    }
}