import React, { useState, useEffect } from 'react';
import { Dog, Copy, RefreshCw, AlertCircle } from 'lucide-react';

function DogCard() {
  const [dogData, setDogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const fetchDog = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      if (!response.ok) throw new Error('Failed to fetch dog image');
      const data = await response.json();
      
      // Parse breed from URL: https://images.dog.ceo/breeds/hound-blood/n02089973_...
      const urlParts = data.message.split('/');
      let breed = 'Unknown';
      if (urlParts.length > 4) {
        // usually it's at index 4 (0: "https:", 1:"", 2:"images.dog.ceo", 3:"breeds", 4:"breed-name")
        breed = urlParts[urlParts.indexOf('breeds') + 1].replace('-', ' ');
        // capitalize
        breed = breed.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      }
      
      setDogData({
        url: data.message,
        breed: breed
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDog();
  }, []);

  const copyUrl = () => {
    if (dogData?.url) {
      navigator.clipboard.writeText(dogData.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="glass-panel card-content">
      <div className="card-header">
        <div className="card-icon">
          <Dog size={24} />
        </div>
        <div>
          <h3 className="text-xl">Dog Finder</h3>
          <p className="text-sm text-muted">dog.ceo API</p>
        </div>
      </div>

      <div className="card-body">
        {loading ? (
          <div className="empty-state">
            <div className="loader"></div>
            <p>Fetching a good boy...</p>
          </div>
        ) : error ? (
          <div className="error-msg">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        ) : dogData ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
            <div style={{ 
              flex: 1, 
              borderRadius: 'var(--radius-md)', 
              overflow: 'hidden', 
              background: 'var(--bg-secondary)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img 
                src={dogData.url} 
                alt="Random Dog" 
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
            </div>
            <div>
              <p className="text-sm text-muted">Breed</p>
              <p className="text-lg font-semibold">{dogData.breed}</p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="card-footer">
        <button className="btn btn-primary" onClick={fetchDog} disabled={loading} style={{ flex: 1 }}>
          <RefreshCw size={18} className={loading ? 'loader-spin' : ''} />
          {loading ? 'Loading...' : 'Get Dog'}
        </button>
        <button className="btn btn-secondary" onClick={copyUrl} disabled={!dogData || loading} title="Copy Image URL">
          <Copy size={18} />
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}

export default DogCard;
