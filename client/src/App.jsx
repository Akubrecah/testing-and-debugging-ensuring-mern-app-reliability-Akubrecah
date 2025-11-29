import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import UserList from './components/UserList';
import Button from './components/Button';

function App() {
  return (
    <ErrorBoundary>
      <div className="App fade-in">
        <div className="glass-card" style={{ width: '100%', maxWidth: '800px', textAlign: 'center' }}>
          <h1><i className="fa-solid fa-flask"></i> MERN Testing App</h1>
          <p style={{ marginBottom: '2rem', color: 'var(--secondary-color)' }}>
            Robust testing and debugging demonstration
          </p>
          <div style={{ marginBottom: '2rem' }}>
            <Button onClick={() => console.log('Clicked')}>
              <i className="fa-solid fa-bolt"></i> Test Action
            </Button>
          </div>
          <UserList />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
