import client from '../api/client';
import type { ApiEnvelope, AuthResponse, User } from '../types';

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  const { data } = await client.post<ApiEnvelope<AuthResponse>>('/auth/signin', { email, password });
  return data.data;
}

export async function signUp(email: string, password: string): Promise<AuthResponse> {
  const { data } = await client.post<ApiEnvelope<AuthResponse>>('/auth/signup', { email, password });
  return data.data;
}

export async function getCurrentUser(): Promise<User> {
  const { data } = await client.get<ApiEnvelope<User>>('/auth/me');
  return data.data;
}