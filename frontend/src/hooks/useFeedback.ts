import { useState } from 'react';
import { createFeedback } from '../services/feedback.service';
import type { CreateFeedbackPayload, Feedback } from '../types';

export function useFeedback() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [submitting, setSubmitting] = useState(false);

  async function submit(payload: CreateFeedbackPayload) {
    setSubmitting(true);
    try {
      const created = await createFeedback(payload);
      setFeedback((current) => [created, ...current]);
      return created;
    } finally {
      setSubmitting(false);
    }
  }

  return { feedback, submitting, submit };
}