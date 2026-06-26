import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

// Codespaces endpoint hint: -8000.app.github.dev/api/activities
function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadActivities = async () => {
      try {
        const response = await fetch(buildApiUrl('activities'), { signal: controller.signal });
        if (!response.ok) {
          throw new Error('Failed to load activities');
        }
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.items || payload.results || [];
        setItems(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load activities');
        }
      } finally {
        setLoading(false);
      }
    };

    loadActivities();

    return () => controller.abort();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading activities...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2 className="mb-3">Activities</h2>
      <ul className="list-group">
        {items.map((item) => (
          <li className="list-group-item" key={item._id || item.id || `${item.type}-${item.date}`}>
            <strong>{item.type}</strong>
            <div className="text-muted small">Duration: {item.duration} min</div>
            <div className="text-muted small">Calories: {item.calories}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Activities;
