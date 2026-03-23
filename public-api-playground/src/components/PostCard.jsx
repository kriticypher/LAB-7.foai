import React, { useState, useEffect } from 'react';
import { FileText, RefreshCw, AlertCircle } from 'lucide-react';

function PostCard() {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPost = async () => {
    setLoading(true);
    setError('');
    try {
      const randomId = Math.floor(Math.random() * 100) + 1;
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${randomId}`);
      if (!response.ok) throw new Error('Failed to fetch post');
      const data = await response.json();
      setPostData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="glass-panel card-content">
      <div className="card-header">
        <div className="card-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
          <FileText size={24} />
        </div>
        <div>
          <h3 className="text-xl">Random Post</h3>
          <p className="text-sm text-muted">jsonplaceholder API</p>
        </div>
      </div>

      <div className="card-body">
        {loading ? (
          <div className="empty-state">
            <div className="loader" style={{ borderLeftColor: '#f59e0b' }}></div>
            <p>Loading post...</p>
          </div>
        ) : error ? (
          <div className="error-msg">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        ) : postData ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ 
              marginBottom: '0.5rem',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid var(--border-color)'
            }}>
              <span className="text-xs font-semibold" style={{ color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Post #{postData.id}
              </span>
              <h4 className="text-xl font-bold mt-1 capitalize leading-tight">
                {postData.title}
              </h4>
            </div>
            
            <p className="text-muted" style={{ lineHeight: '1.6' }}>
              {postData.body}
            </p>
          </div>
        ) : null}
      </div>

      <div className="card-footer">
        <button 
          className="btn btn-primary" 
          onClick={fetchPost} 
          disabled={loading} 
          style={{ 
            flex: 1, 
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            boxShadow: '0 4px 14px 0 rgba(245, 158, 11, 0.39)'
          }}
        >
          <RefreshCw size={18} className={loading ? 'loader-spin' : ''} />
          {loading ? 'Loading...' : 'Get Post'}
        </button>
      </div>
    </div>
  );
}

export default PostCard;
