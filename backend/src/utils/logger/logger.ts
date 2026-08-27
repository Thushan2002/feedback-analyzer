import pino from 'pino';
import { env } from '../../config/env.js';

const isProduction = env.isProduction

export const logger = pino({
  level: process.env.LOG_LEVEL || (isProduction ? 'info' : 'debug'),
  transport: !isProduction
    ? {
        target: 'pino-pretty',
        options: { colorize: true, translateTime: 'SYS:standard' },
      }
    : undefined,
  redact: {
    paths: ['req.headers.authorization', 'req.headers.cookie', 'body.password', 'body.creditCard'],
    censor: '[REDACTED]',
  },
  formatters: {
    level: (label) => ({ level: label }), // Write level names (info, error) instead of numeric codes
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});