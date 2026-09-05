import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { Button } from '../components/common/Button';
import { DashboardStats } from '../features/dashboard/DashboardStats';
import { FeedbackList } from '../features/feedback/FeedbackList';
import { useAuth } from '../hooks/auth-context';
import { useFeedback } from '../hooks/useFeedback';
import { FeedbackForm } from '../components/forms/FeedbackForm';
import { getApiError } from '../utils/api-error';

export function DashboardPage() {
  const { user } = useAuth();
  const { feedback, submitting, submit } = useFeedback();
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  async function handleSubmit(payload: Parameters<typeof submit>[0]) { setError(''); try { await submit(payload); setShowForm(false); } catch (requestError) { setError(getApiError(requestError)); } }
  return <><div className="page-heading"><div><p className="eyebrow">Overview</p><h2>Good morning, {user?.email.split('@')[0]}</h2><p className="muted">Keep a pulse on the feedback coming in.</p></div><Button onClick={() => setShowForm((value) => !value)}><FiPlus /> New feedback</Button></div>{showForm && <section className="panel"><FeedbackForm userId={user!.id} onSubmit={handleSubmit} submitting={submitting} />{error && <p className="form-error">{error}</p>}</section>}<DashboardStats feedback={feedback} /><section className="panel"><div className="panel-heading"><div><p className="eyebrow">Recent activity</p><h3>Feedback stream</h3></div><span className="count">{feedback.length}</span></div><FeedbackList feedback={feedback} /></section></>;
}