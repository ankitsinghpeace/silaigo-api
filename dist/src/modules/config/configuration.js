"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path = require("path");
(0, dotenv_1.config)({ path: path.resolve(__dirname, '../../.env') });
exports.default = () => {
    const nodeEnv = process.env.NODE_ENV || 'development';
    const seedData = Boolean(process.env.SEED_DATA) || false;
    const appPort = parseInt(process.env.APP_PORT || '3001', 10);
    const ddagent = {
        service: process.env.DD_SERVICE_NAME || 'sgo-wbx-api',
        env: process.env.DD_ENV || 'production',
    };
    const mongo = {
        user: process.env.MONGO_USER || '',
        password: process.env.MONGO_PASSWORD || '',
        host: process.env.MONGO_HOST || '',
        db: process.env.MONGO_DB || '',
    };
    const razorpay = {
        keyId: process.env.RAZORPAY_KEY_ID || '',
        keySecret: process.env.RAZORPAY_KEY_SECRET || '',
    };
    return {
        nodeEnv,
        appPort,
        ddagent,
        mongo,
        seedData,
        razorpay,
    };
};
//# sourceMappingURL=configuration.js.map