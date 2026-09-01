import type { Request, Response } from 'express';

import type { CreateUserDto, SigninUserDto } from '../../dto/user/index.js';
import * as userService from '../../services/user/user.service.js';
import { AppError } from '../../utils/AppError.js';

export async function signup(
  req: Request<unknown, unknown, CreateUserDto>,
  res: Response,
): Promise<void> {
  const result = await userService.signup(req.body);
  res.status(201).json({
    success: true,
    data: result,
  });
}

export async function signin(
  req: Request<unknown, unknown, SigninUserDto>,
  res: Response,
): Promise<void> {
  const result = await userService.signin(req.body);
  res.status(200).json({
    success: true,
    data: result,
  });
}

export async function getMe(
  req: Request,
  res: Response,
): Promise<void> {
  if (!req.user?.userId) {
    throw new AppError('Unauthorized', 401);
  }

  const user = await userService.getUserById(req.user.userId);
  res.status(200).json({
    success: true,
    data: user,
  });
}
