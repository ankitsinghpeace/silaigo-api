"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const Joi = require("joi");
exports.validationSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development'),
    APP_PORT: Joi.number().default(3001),
    DD_SERVICE_NAME: Joi.string().required(),
    DD_ENV: Joi.string().valid('development', 'production', 'staging').required(),
    MONGO_USER: Joi.string().required(),
    MONGO_PASSWORD: Joi.string().required(),
    MONGO_HOST: Joi.string().required(),
    MONGO_DB: Joi.string().required(),
    SEED_DATA: Joi.boolean().default(false),
});
//# sourceMappingURL=validation-schema.js.map