export type Sentiment = 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';

export interface User {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Feedback {
  id: string;
  text: string;
  sentiment: Sentiment | null;
  confidence: number | null;
  urgencyScore: number | null;
  source: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFeedbackPayload {
  text: string;
  urgencyScore?: number;
  source?: string;
  userId: string;
}

export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
}