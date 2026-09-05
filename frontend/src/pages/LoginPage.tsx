import { Navigate } from 'react-router-dom';
import { AuthPanel } from '../features/auth/AuthPanel';
import { useAuth } from '../hooks/auth-context';

export function LoginPage() {
  const { user } = useAuth();
  if (user) return <Navigate to="/" replace />;
  return <main className="auth-page"><AuthPanel /><aside className="auth-aside"><span>01</span><p>Capture the voice of your customers.</p><small>Every message is a signal. Make yours actionable.</small></aside></main>;
}