import dotenv from 'dotenv';
import { Config } from '../types';

dotenv.config();

const { PORT, NODE_ENV, MONGO_URI, JWT_SECRET } = process.env;

/**
 * Server configuration object
 * @type {Config}
 */
export const config: Config = {
  port: parseInt(PORT as string, 10) || 3001,
  mongoUri: MONGO_URI,
  jwtSecret: JWT_SECRET,
  nodeEnv: NODE_ENV
};
