import type { Request, Response } from 'express';
import express from 'express';

import { errorHandler, notFoundHandler } from './middlewares/error.middleware.js';
import routes from './routes/index.js';
import { httpLogger } from './middlewares/http.logger.js';

const app = express();

app.disable('x-powered-by');
app.use(express.json());
app.use(httpLogger);

app.use((req, res, next) => {                                                                                                                        
  if (req.id) {                                                                                                                                      
    res.setHeader('x-request-id', req.id as string);                                                                                                 
  }                                                                                                                                                  
  next();                                                                                                                                            
});

app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Hello from Feedback Analyser',
  });
});

app.use('/api/v1', routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
