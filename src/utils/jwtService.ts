
import * as jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export function signJwt(payload, expiry = '1h', secret = ACCESS_TOKEN_SECRET) {
    return jwt.sign(payload, secret, { expiresIn: expiry });
}

export function verifyJwt(token, secret = ACCESS_TOKEN_SECRET) {
    return jwt.verify(token, secret);
}


