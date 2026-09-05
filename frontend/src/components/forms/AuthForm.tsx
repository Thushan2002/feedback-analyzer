import { useState, type FormEvent } from 'react';
import { FiArrowRight, FiLock, FiMail } from 'react-icons/fi';
import { Button } from '../common/Button';

interface AuthFormProps {
  onSubmit: (email: string, password: string, createAccount: boolean) => Promise<void>;
  error: string;
}

export function AuthForm({ onSubmit, error }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createAccount, setCreateAccount] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    try { await onSubmit(email, password, createAccount); } finally { setBusy(false); }
  }

  return <form className="form" onSubmit={handleSubmit}>
    <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" required /></label>
    <label>Password<input type="password" minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" required /></label>
    {error && <p className="form-error">{error}</p>}
    <Button disabled={busy}>{busy ? 'Connecting...' : createAccount ? 'Create account' : 'Sign in'} <FiArrowRight /></Button>
    <button className="form-switch" type="button" onClick={() => setCreateAccount((value) => !value)}>
      {createAccount ? 'Already have an account? Sign in' : 'New here? Create an account'}
    </button>
  </form>;
}

export function AuthFormIcon({ type }: { type: 'email' | 'password' }) {
  return type === 'email' ? <FiMail /> : <FiLock />;
}