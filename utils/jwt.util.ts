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
    try {
        const username = jwt.verify(token, `${process.env.JWT_SECRET}`)
        return username
    } catch (error) {
        return null
    }
}
