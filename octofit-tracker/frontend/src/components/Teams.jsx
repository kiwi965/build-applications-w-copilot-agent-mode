import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

// Codespaces endpoint hint: -8000.app.github.dev/api/teams
function Teams() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadTeams = async () => {
      try {
        const response = await fetch(buildApiUrl('teams'), { signal: controller.signal });
        if (!response.ok) {
          throw new Error('Failed to load teams');
        }
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.items || payload.results || [];
        setItems(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load teams');
        }
      } finally {
        setLoading(false);
      }
    };

    loadTeams();

    return () => controller.abort();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading teams...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2 className="mb-3">Teams</h2>
      <ul className="list-group">
        {items.map((item) => (
          <li className="list-group-item" key={item._id || item.id || item.name}>
            <strong>{item.name}</strong>
            <div className="text-muted small">Sport: {item.sport}</div>
            <div className="text-muted small">Members: {item.members}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Teams;
