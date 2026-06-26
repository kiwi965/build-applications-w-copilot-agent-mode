import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

function Workouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadWorkouts = async () => {
      try {
        const response = await fetch(buildApiUrl('workouts'), { signal: controller.signal });
        if (!response.ok) {
          throw new Error('Failed to load workouts');
        }
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.items || payload.results || [];
        setItems(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load workouts');
        }
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();

    return () => controller.abort();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading workouts...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2 className="mb-3">Workouts</h2>
      <ul className="list-group">
        {items.map((item) => (
          <li className="list-group-item" key={item._id || item.id || item.title}>
            <strong>{item.title}</strong>
            <div className="text-muted small">Difficulty: {item.difficulty}</div>
            <div className="text-muted small">Duration: {item.duration} min</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Workouts;
