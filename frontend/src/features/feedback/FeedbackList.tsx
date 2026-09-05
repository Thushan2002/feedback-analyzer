import { FiCheckCircle, FiMinusCircle, FiXCircle } from 'react-icons/fi';
import type { Feedback } from '../../types';

export function FeedbackList({ feedback }: { feedback: Feedback[] }) {
  if (!feedback.length) return <div className="empty-state"><FiMessageFallback /> <p>Your analysed feedback will appear here.</p></div>;
  return <div className="feedback-list">{feedback.map((item) => <article className="feedback-item" key={item.id}><div><p>{item.text}</p><small>{item.source || 'Unspecified source'} · {new Date(item.createdAt).toLocaleDateString()}</small></div><span className={`sentiment sentiment-${item.sentiment?.toLowerCase() ?? 'unknown'}`}>{item.sentiment === 'POSITIVE' ? <FiCheckCircle /> : item.sentiment === 'NEGATIVE' ? <FiXCircle /> : <FiMinusCircle />}{item.sentiment ?? 'Pending'}</span></article>)}</div>;
}

function FiMessageFallback() { return <FiMinusCircle aria-hidden="true" />; }