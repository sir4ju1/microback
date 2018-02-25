"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
class Auth {
    static generateHash(password) {
        const secret = process.env.PASS || 'abcdgef';
        const passwordHash = crypto.createHmac('sha256', secret)
            .update(password)
            .digest('hex');
        return passwordHash;
    }
    static generateToken(data) {
        try {
            const token = jwt.sign(data, process.env.SECUREKEY || 'my-key');
            return token;
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.default = Auth;
//# sourceMappingURL=Auth.js.map