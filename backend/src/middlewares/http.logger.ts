import { randomUUID } from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';

import { pinoHttp } from 'pino-http';

import { logger } from '../utils/logger/logger.js';

export const httpLogger = pinoHttp({
  logger,
  genReqId: (req) => (req.headers['x-request-id'] as string) || randomUUID(),
  customLogLevel: (_req, res, err) => {
    if (res.statusCode >= 500 || err) {
      return 'error';
    }
    if (res.statusCode >= 400) {
      return 'warn';
    }
    return 'info';
  },
  customSuccessMessage: (req, res) =>
    `${req.method ?? ''} ${req.url ?? ''} completed with ${res.statusCode}`,
  customErrorMessage: (req, res, err) => {
    const errorMsg = err instanceof Error ? err.message : `status code ${res.statusCode}`;
    return `${req.method ?? ''} ${req.url ?? ''} failed with ${errorMsg}`;
  },
  serializers: {
    req: (req: IncomingMessage & { id?: unknown; query?: unknown }) => ({
      id: req.id,
      method: req.method,
      url: req.url,
      query: req.query,
    }),
    res: (res: ServerResponse) => ({
      statusCode: res.statusCode,
    }),
  },
});
