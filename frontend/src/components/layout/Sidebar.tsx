import { NavLink } from 'react-router-dom';
import { FiActivity, FiHome } from 'react-icons/fi';

export function Sidebar() {
  return <aside className="sidebar">
    <p className="sidebar-label">Workspace</p>
    <nav>
      <NavLink to="/" end><FiHome /> Overview</NavLink>
      <NavLink to="/feedback"><FiActivity /> Feedback</NavLink>
    </nav>
  </aside>;
}