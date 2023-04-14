import mongoose from 'mongoose';
import { config } from '../config';
import { logger } from '../services';

const { nodeEnv, mongoUri } = config;

const databaseLogger = logger.child({ service: 'Database' });

/**
 * Mongoose connection options.
 * @type {mongoose.ConnectOptions}
 */
const mongooseConnectionOptions: mongoose.ConnectOptions = {
  autoIndex: nodeEnv === 'development'
};

/**
 * Connects to MongoDB.
 * @returns {Promise<void>}
 */
const initializeMongoDBConnection = async (): Promise<void> => {
  if (!mongoUri) {
    databaseLogger.error('MongoDB connection URI is not defined');
    return;
  }
  await mongoose.connect(mongoUri, mongooseConnectionOptions);
};

export { initializeMongoDBConnection, databaseLogger };
