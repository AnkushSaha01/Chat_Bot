import jwt from 'jsonwebtoken';
import config from '../config/config.js';


export function generateJWT(data) {
    const token = jwt.sign(data, config.jwt_secret, {
        expiresIn: "3d",
    })
    return token;
}

export function verifyJWT(token) {
    try {
        const decoded = jwt.verify(token, config.jwt_secret);
        return decoded;
    } catch (error) {
        console.error("Invalid token", error.message);
        return null;
    }
}