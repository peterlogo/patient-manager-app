import pino from 'pino';

const transport = pino.transport({
  target: 'pino-pretty',
  options: {
    colorize: true,
    prettyPrint: true
  }
});

export const logger: pino.Logger = pino({ level: 'debug', redact: {
  paths: ['req.headers.authorization'],
  censor: '[REDACTED]',
}, }, transport);
