import React, { useState, useEffect } from 'react';
import { User, Mail, MapPin, Phone, RefreshCw, AlertCircle } from 'lucide-react';

function UserCard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUser = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://randomuser.me/api/');
      if (!response.ok) throw new Error('Failed to fetch user');
      const data = await response.json();
      const user = data.results[0];
      setUserData({
        name: `${user.name.first} ${user.name.last}`,
        picture: user.picture.large,
        email: user.email,
        country: user.location.country,
        phone: user.phone,
        age: user.dob.age
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="glass-panel card-content">
      <div className="card-header">
        <div className="card-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
          <User size={24} />
        </div>
        <div>
          <h3 className="text-xl">Random User Profile</h3>
          <p className="text-sm text-muted">randomuser.me API</p>
        </div>
      </div>

      <div className="card-body">
        {loading ? (
          <div className="empty-state">
            <div className="loader" style={{ borderLeftColor: '#10b981' }}></div>
            <p>Finding someone...</p>
          </div>
        ) : error ? (
          <div className="error-msg">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        ) : userData ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', textAlign: 'center' }}>
            <div style={{ position: 'relative' }}>
              <img 
                src={userData.picture} 
                alt={userData.name} 
                style={{ 
                  width: '100px', 
                  height: '100px', 
                  borderRadius: '50%',
                  border: '3px solid #10b981',
                  boxShadow: '0 4px 10px rgba(16, 185, 129, 0.3)'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <h4 className="text-2xl font-bold">{userData.name}</h4>
              <p className="text-sm text-muted">Age: {userData.age}</p>
            </div>
            
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'left', background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Mail size={16} className="text-muted" />
                <span className="text-sm truncate" title={userData.email}>{userData.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <MapPin size={16} className="text-muted" />
                <span className="text-sm">{userData.country}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone size={16} className="text-muted" />
                <span className="text-sm">{userData.phone}</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="card-footer">
        <button 
          className="btn btn-primary" 
          onClick={fetchUser} 
          disabled={loading} 
          style={{ 
            flex: 1, 
            background: 'linear-gradient(135deg, #10b981, #059669)',
            boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.39)'
          }}
        >
          <RefreshCw size={18} className={loading ? 'loader-spin' : ''} />
          {loading ? 'Loading...' : 'Get User'}
        </button>
      </div>
    </div>
  );
}

export default UserCard;
