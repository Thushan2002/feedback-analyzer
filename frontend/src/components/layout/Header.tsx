import { FiLogOut, FiMessageSquare } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth-context';
import { Button } from '../common/Button';

export function Header() {
  const { user, logout } = useAuth();
  return <header className="topbar">
    <div className="brand"><FiMessageSquare /> Feedback Manager</div>
    <div className="topbar-user"><span>{user?.email}</span><Button variant="ghost" onClick={logout}><FiLogOut /> Sign out</Button></div>
  </header>;
}