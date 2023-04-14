import express, { Express } from 'express';
import { pinoHttp } from 'pino-http';
import { logger } from './services';

const app: Express = express();

const port = 3001;

app.use(pinoHttp({ logger }));

app.listen(port, () => logger.info(`Server listening on port ${port}`));
