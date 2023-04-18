import express, { Express } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import passportJwt from 'passport-jwt';
import { pinoHttp } from 'pino-http';
import { logger } from './services';
import { config } from './config';
import { databaseLogger, initializeMongoDBConnection } from './db';
import { patientRouter, userRouter, authRouter } from './routes';
import { ROUTE_PREFIX } from './utils';

const { port } = config;
const app: Express = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pinoHttp({ logger }));

passport.use(
  new passportJwt.Strategy(
    {
      jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtSecret
    },
    (jwtPayload, done) => {
      if (jwtPayload) {
        return done(null, jwtPayload);
      }
      return done(null, false);
    }
  )
);

// Routes
app.use(`${ROUTE_PREFIX}/patients`, patientRouter);
app.use(`${ROUTE_PREFIX}/users`, userRouter);
app.use(`${ROUTE_PREFIX}`, authRouter);

initializeMongoDBConnection().catch((err) => {
  databaseLogger.error('Error initializing MongoDB connection', err);
});

mongoose.connection.on('connected', () => {
  databaseLogger.info('Connected to MongoDB');
});
mongoose.connection.on('disconnected', () => {
  databaseLogger.error('Disconnected from MongoDB');
});
mongoose.connection.on('error', (err) => {
  databaseLogger.error('MongoDB connection error', err);
});

process.on('SIGINT', () => {
  mongoose.connection.on('close', () => {
    logger.info('Database connection closed');
    process.exit(0);
  });
});

app.listen(port, () => logger.info(`Server listening on port ${port}`));
