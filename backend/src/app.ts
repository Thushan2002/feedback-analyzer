import cors from 'cors';
import type { Request, Response } from 'express';
import express from 'express';

import { env } from './config/env.js';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware.js';
import { httpLogger } from './middlewares/http.logger.js';
import routes from './routes/index.js';

const app = express();

app.disable('x-powered-by');
app.use(cors({ origin: env.frontendUrl }));
app.use(express.json());
app.use(httpLogger);

app.use((req, res, next) => {
  if (req.id) {
    res.setHeader('x-request-id', req.id as string);
  }
  next();
});

app.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Hello from Feedback Analyser',
  });
});

app.use('/api/v1', routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
