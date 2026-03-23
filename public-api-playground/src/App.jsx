import React, { useState } from 'react';
import { Activity, LayoutGrid, Github } from 'lucide-react';
import DogCard from './components/DogCard';
import JokeCard from './components/JokeCard';
import UserCard from './components/UserCard';
import PostCard from './components/PostCard';

function App() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass-panel" style={{ borderRadius: '0', borderTop: 'none', borderLeft: 'none', borderRight: 'none', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="container" style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="card-icon">
              <Activity size={24} />
            </div>
            <div>
              <h1 className="text-xl" style={{ margin: 0 }}>Public API Playground</h1>
              <p className="text-sm text-muted" style={{ margin: 0 }}>Discover random data from across the web</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '0.5rem' }}>
              <Github size={20} />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container">
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h2 className="text-4xl text-gradient" style={{ marginBottom: '1rem' }}>Explore APIs In One Place</h2>
          <p className="text-lg text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
            A unified interface to fetch random dogs, hilarious jokes, mock users, and placeholder posts. Premium UI powered by React and Vite.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-2">
          <DogCard />
          <JokeCard />
          <UserCard />
          <PostCard />
        </div>
      </main>
      
      {/* Footer */}
      <footer style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p className="text-sm">Built with React, Vite & Modern CSS</p>
      </footer>
    </div>
  );
}

export default App;
