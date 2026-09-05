import { Navigate, Route, Routes } from 'react-router-dom';
import { Loading } from '../components/common/Loading';
import { useAuth } from '../hooks/auth-context';
import { AppLayout } from '../layouts/AppLayout';
import { DashboardPage } from '../pages/DashboardPage';
import { FeedbackPage } from '../pages/FeedbackPage';
import { LoginPage } from '../pages/LoginPage';

function ProtectedRoutes() {
  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" replace />;
  return <AppLayout />;
}

export function AppRoutes() {
  return <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route element={<ProtectedRoutes />}>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/feedback" element={<FeedbackPage />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}