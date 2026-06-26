import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

function Users() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadUsers = async () => {
      try {
        const response = await fetch(buildApiUrl('users'), { signal: controller.signal });
        if (!response.ok) {
          throw new Error('Failed to load users');
        }
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.items || payload.results || [];
        setItems(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load users');
        }
      } finally {
        setLoading(false);
      }
    };

    loadUsers();

    return () => controller.abort();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading users...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2 className="mb-3">Users</h2>
      <ul className="list-group">
        {items.map((item) => (
          <li className="list-group-item" key={item._id || item.id || item.email}>
            <strong>{item.name || item.email}</strong>
            <div className="text-muted small">{item.email}</div>
            <div className="text-muted small">Role: {item.role}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
