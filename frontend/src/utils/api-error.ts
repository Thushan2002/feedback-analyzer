import axios from 'axios';

export function getApiError(error: unknown): string {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? 'The request could not be completed.';
  }
  return 'The request could not be completed.';
}