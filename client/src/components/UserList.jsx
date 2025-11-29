import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/users')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => setUsers(data))
      .catch(err => setError(err.message));
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ width: '100%' }}>
      <h2 style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
        <i className="fa-solid fa-users"></i> Users
      </h2>
      <div className="user-grid">
        {users.map((user, index) => (
          <div key={user._id} className="user-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <h3>{user.name}</h3>
              <p>{user.email || 'No email provided'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
