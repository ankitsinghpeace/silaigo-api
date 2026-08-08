"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJwt = signJwt;
exports.verifyJwt = verifyJwt;
const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
function signJwt(payload, expiry = '1h', secret = ACCESS_TOKEN_SECRET) {
    return jwt.sign(payload, secret, { expiresIn: expiry });
}
function verifyJwt(token, secret = ACCESS_TOKEN_SECRET) {
    return jwt.verify(token, secret);
}
//# sourceMappingURL=jwtService.js.map