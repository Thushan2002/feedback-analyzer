import { Outlet } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';

export function AppLayout() {
  return <div className="app-shell"><Header /><div className="app-body"><Sidebar /><main className="content"><Outlet /></main></div></div>;
}