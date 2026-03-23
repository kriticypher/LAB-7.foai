import React, { useState, useEffect } from 'react';
import { Smile, RefreshCw, AlertCircle } from 'lucide-react';

function JokeCard() {
  const [jokeData, setJokeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchJoke = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=twopart&safe-mode');
      if (!response.ok) throw new Error('Failed to fetch joke');
      const data = await response.json();
      // Map to consistent shape: setup + punchline
      setJokeData({ setup: data.setup, punchline: data.delivery });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="glass-panel card-content">
      <div className="card-header">
        <div className="card-icon" style={{ background: 'rgba(236, 72, 153, 0.1)', color: '#ec4899' }}>
          <Smile size={24} />
        </div>
        <div>
          <h3 className="text-xl">Joke Generator</h3>
          <p className="text-sm text-muted">official-joke-api</p>
        </div>
      </div>

      <div className="card-body" style={{ justifyContent: 'center' }}>
        {loading ? (
          <div className="empty-state">
            <div className="loader" style={{ borderLeftColor: '#ec4899' }}></div>
            <p>Thinking of a joke...</p>
          </div>
        ) : error ? (
          <div className="error-msg">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        ) : jokeData ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
            <div>
              <p className="text-xl font-medium" style={{ color: 'var(--text-primary)' }}>
                "{jokeData.setup}"
              </p>
            </div>
            <div style={{ 
              padding: '1rem', 
              background: 'rgba(236, 72, 153, 0.1)', 
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(236, 72, 153, 0.2)'
            }}>
              <p className="text-xl font-bold" style={{ color: '#fbcfe8' }}>
                {jokeData.punchline}
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="card-footer">
        <button 
          className="btn btn-primary" 
          onClick={fetchJoke} 
          disabled={loading} 
          style={{ 
            flex: 1, 
            background: 'linear-gradient(135deg, #ec4899, #db2777)',
            boxShadow: '0 4px 14px 0 rgba(236, 72, 153, 0.39)'
          }}
        >
          <RefreshCw size={18} className={loading ? 'loader-spin' : ''} />
          {loading ? 'Loading...' : 'Next Joke'}
        </button>
      </div>
    </div>
  );
}

export default JokeCard;
