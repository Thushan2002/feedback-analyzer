import { useState, type FormEvent } from 'react';
import { FiSend } from 'react-icons/fi';
import { Button } from '../common/Button';
import type { CreateFeedbackPayload } from '../../types';

interface FeedbackFormProps { userId: string; onSubmit: (payload: CreateFeedbackPayload) => Promise<void>; submitting: boolean; }

export function FeedbackForm({ userId, onSubmit, submitting }: FeedbackFormProps) {
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const [urgencyScore, setUrgencyScore] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await onSubmit({ text, userId, source: source || undefined, urgencyScore: urgencyScore ? Number(urgencyScore) : undefined });
    setText(''); setSource(''); setUrgencyScore('');
  }

  return <form className="feedback-form" onSubmit={handleSubmit}>
    <label>What did your customer say?<textarea value={text} onChange={(event) => setText(event.target.value)} placeholder="Paste a customer comment to analyse..." required /></label>
    <div className="form-grid"><label>Source<input value={source} onChange={(event) => setSource(event.target.value)} placeholder="Email, chat, survey" /></label><label>Urgency score<input type="number" min="0" step="0.1" value={urgencyScore} onChange={(event) => setUrgencyScore(event.target.value)} placeholder="Optional" /></label></div>
    <Button disabled={submitting || !text.trim()}>{submitting ? 'Analysing...' : 'Analyse feedback'} <FiSend /></Button>
  </form>;
}