import type { NextFunction, Request, Response } from 'express';
import type { ZodType } from 'zod';

import { AppError } from '../utils/AppError.js';

type ValidationTarget = 'body' | 'params' | 'query';

export function validateSchema(type: ValidationTarget, schema: ZodType) {
  return function (req: Request, _res: Response, next: NextFunction): void {
    const results = schema.safeParse(req[type]);
    if (!results.success) {
      const errorMessage = results.error.issues.map((issue) => issue.message).join(', ');
      throw new AppError(errorMessage || `${type} Validation Error`, 400);
    }
    req[type] = results.data;
    next();
  };
}
