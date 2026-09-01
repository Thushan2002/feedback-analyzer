import type { User } from '../../generated/prisma/client.js';

export interface UserResponseDto {
  id: string;
  email: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface AuthResponseDto {
  user: UserResponseDto;
  token: string;
}

export function toUserResponseDto(user: User): UserResponseDto {
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export function toAuthResponseDto(user: User, token: string): AuthResponseDto {
  return {
    user: toUserResponseDto(user),
    token,
  };
}
