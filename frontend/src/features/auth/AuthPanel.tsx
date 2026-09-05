import { FiMessageSquare } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth-context';
import { getApiError } from '../../utils/api-error';
import { AuthForm } from '../../components/forms/AuthForm';
import { useState } from 'react';

export function AuthPanel() {
  const { authenticate } = useAuth();
  const [error, setError] = useState('');
  async function handleSubmit(email: string, password: string, createAccount: boolean) {
    setError('');
    try { await authenticate(email, password, createAccount); } catch (requestError) { setError(getApiError(requestError)); }
  }
  return <section className="auth-panel"><div className="auth-heading"><FiMessageSquare /><p className="eyebrow">Feedback intelligence</p><h1>Listen closer.<br /><em>Respond smarter.</em></h1><p className="muted">Turn customer words into clear sentiment signals for your team.</p></div><AuthForm onSubmit={handleSubmit} error={error} /></section>;
}