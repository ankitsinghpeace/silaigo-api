// src/modules/config/validation-schema.ts

import * as Joi from 'joi';

export const validationSchema = Joi.object({
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
