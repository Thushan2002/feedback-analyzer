import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError.js';
import { ZodType } from 'zod';

type ValidationTarget = "body" | "params"; 

export function validateSchema(type : ValidationTarget, schema : ZodType){
    return function (req : Request, _res : Response, next : NextFunction): void{
        const results = schema.safeParse(req[type]);
        if(!results.success){
            throw new AppError(`${type} Validation Error`, 400)
        }
        req[type] = results.data;
        next()
    }
}