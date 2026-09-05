import { FiActivity, FiClock, FiMessageCircle } from 'react-icons/fi';
import type { Feedback } from '../../types';

export function DashboardStats({ feedback }: { feedback: Feedback[] }) {
  const analysed = feedback.filter((item) => item.sentiment).length;
  const positive = feedback.filter((item) => item.sentiment === 'POSITIVE').length;
  return <div className="stats-grid"><article className="stat"><FiMessageCircle /><strong>{feedback.length}</strong><span>Submitted here</span></article><article className="stat"><FiActivity /><strong>{analysed}</strong><span>Analysed</span></article><article className="stat"><FiClock /><strong>{positive}</strong><span>Positive signals</span></article></div>;
}