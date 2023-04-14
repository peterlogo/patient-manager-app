import express, { Express } from 'express';
import { pinoHttp } from 'pino-http';
import { logger } from './services';
import { config } from './config';

const { port } = config;
const app: Express = express();

app.use(pinoHttp({ logger }));

app.listen(port, () => logger.info(`Server listening on port ${port}`));
