import client from '../api/client';
import type { ApiEnvelope, CreateFeedbackPayload, Feedback } from '../types';

export async function createFeedback(payload: CreateFeedbackPayload): Promise<Feedback> {
  const { data } = await client.post<ApiEnvelope<Feedback>>('/feedbacks/', payload);
  return data.data;
}

export async function getFeedback(id: string): Promise<Feedback> {
  const { data } = await client.get<ApiEnvelope<Feedback>>(`/feedbacks/${id}`);
  return data.data;
}