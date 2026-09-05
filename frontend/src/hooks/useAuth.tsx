import { useEffect, useState, type ReactNode } from 'react';
import { getCurrentUser, signIn, signUp } from '../services/auth.service';
import type { User } from '../types';
import { AuthContext } from './auth-context';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem('feedback_token')));

  useEffect(() => {
    if (!localStorage.getItem('feedback_token')) {
      return;
    }
    getCurrentUser()
      .then(setUser)
      .catch(() => localStorage.removeItem('feedback_token'))
      .finally(() => setLoading(false));
  }, []);

  async function authenticate(email: string, password: string, createAccount: boolean) {
    const result = createAccount ? await signUp(email, password) : await signIn(email, password);
    localStorage.setItem('feedback_token', result.token);
    setUser(result.user);
  }

  function logout() {
    localStorage.removeItem('feedback_token');
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, loading, authenticate, logout }}>{children}</AuthContext.Provider>;
}
