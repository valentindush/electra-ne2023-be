import jwt from "jsonwebtoken";

export const generateToken = (username: string) => {
    const token = jwt.sign({
        username
    },`${process.env.JWT_SECRET}`, {
        expiresIn: '1d'
    })

    return token
}

export const verifyToken = (token: string) => {
    
}
