import crypto from 'crypto';
import { number } from 'zod';

export const generateElectricityToken = (deviceNumber: string, amount: number): {token: string, expiryDate: Date} => {
    const tokenLength = 16;
    const remainingLength = tokenLength - deviceNumber.length;

    // Generate random bytes
    const randomBytes = crypto.randomBytes(remainingLength);
    const randomString = randomBytes.toString('base64')
        .replace(/[\+\/]/g, '') // Remove characters not suitable for a token
        .slice(0, remainingLength); // Trim to desired length

    const token = deviceNumber + randomString;


    const expiryDate = new Date(Date.now() + 1000 * 3600 * 24 * 0.01 * amount)

    return {
        token,
        expiryDate
    }
};