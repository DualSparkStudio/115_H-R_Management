import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import './AdminLogin.css';

const AdminLogin = () => {
  const { login } = useData();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const success = login(password);
      if (!success) {
        setError('Invalid password. Please try again.');
        setPassword('');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="admin-login">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <h1 className="admin-login-title">Admin Panel</h1>
            <p className="admin-login-subtitle">LuxeStay Management</p>
          </div>
          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="admin-form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className={error ? 'error' : ''}
                autoFocus
              />
              {error && <span className="admin-error-message">{error}</span>}
            </div>
            <button
              type="submit"
              className="admin-login-button"
              disabled={loading || !password}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="admin-login-hint">
            <p>Default password: <code>admin123</code></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

