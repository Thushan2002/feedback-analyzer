import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { env } from '../../config/env.js';
import { prisma } from '../../config/prisma.js';
import type {
  AuthResponseDto,
  CreateUserDto,
  SigninUserDto,
  UserResponseDto,
} from '../../dto/user/index.js';
import { toAuthResponseDto, toUserResponseDto } from '../../dto/user/index.js';
import { AppError } from '../../utils/AppError.js';

export async function signup(dto: CreateUserDto): Promise<AuthResponseDto> {
  const email = dto.email.toLowerCase().trim();

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new AppError('User with this email already exists', 409);
  }

  const hashedPassword = await bcrypt.hash(dto.password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn as jwt.SignOptions['expiresIn'] },
  );

  return toAuthResponseDto(user, token);
}

export async function signin(dto: SigninUserDto): Promise<AuthResponseDto> {
  const email = dto.email.toLowerCase().trim();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const isPasswordValid = await bcrypt.compare(dto.password, user.password);

  if (!isPasswordValid) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn as jwt.SignOptions['expiresIn'] },
  );

  return toAuthResponseDto(user, token);
}

export async function getUserById(id: string): Promise<UserResponseDto> {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return toUserResponseDto(user);
}
