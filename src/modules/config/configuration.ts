// src/config/configuration.ts

import { config } from 'dotenv';
import * as path from 'path';

// Load environment variables from the root directory .env file
config({ path: path.resolve(__dirname, '../../.env') });

interface DDAgentConfig {
  service: string;
  env: string;
}

interface MongoConfig {
  user: string;
  password: string;
  host: string;
  db: string;
}

interface Config {
  nodeEnv: string;
  appPort: number;
  ddagent: DDAgentConfig;
  mongo: MongoConfig;
  seedData: boolean;
  razorpay: RazorpayConfig;
}

interface RazorpayConfig {
  keyId: string;
  keySecret: string;
}

export default (): Config => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const seedData: boolean = Boolean(process.env.SEED_DATA) || false;
  const appPort = parseInt(process.env.APP_PORT || '3001', 10);

  const ddagent: DDAgentConfig = {
    service: process.env.DD_SERVICE_NAME || 'sgo-wbx-api',
    env: process.env.DD_ENV || 'production',
  };

  const mongo: MongoConfig = {
    user: process.env.MONGO_USER || '',
    password: process.env.MONGO_PASSWORD || '',
    host: process.env.MONGO_HOST || '',
    db: process.env.MONGO_DB || '',
  };

  const razorpay: RazorpayConfig = {
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
