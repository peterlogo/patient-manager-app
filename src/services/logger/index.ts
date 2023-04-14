import pino from 'pino';

const transport = pino.transport({
  target: 'pino-pretty',
  options: {
    colorize: true,
    prettyPrint: true
  }
});

export const logger: pino.Logger = pino({ level: 'debug' }, transport);
