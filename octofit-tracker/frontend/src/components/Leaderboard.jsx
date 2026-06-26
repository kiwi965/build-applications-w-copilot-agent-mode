import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

function Leaderboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadLeaderboard = async () => {
      try {
        const response = await fetch(buildApiUrl('leaderboard'), { signal: controller.signal });
        if (!response.ok) {
          throw new Error('Failed to load leaderboard');
        }
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.items || payload.results || [];
        setItems(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load leaderboard');
        }
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();

    return () => controller.abort();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading leaderboard...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2 className="mb-3">Leaderboard</h2>
      <ul className="list-group">
        {items.map((item) => (
          <li className="list-group-item" key={item._id || item.userId || item.name}>
            <strong>{item.name}</strong>
            <div className="text-muted small">Points: {item.points}</div>
            <div className="text-muted small">Rank: {item.rank}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
