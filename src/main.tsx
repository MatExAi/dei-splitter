import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f3f4f6',
      padding: '20px'
    }}>
      <h1 style={{
        fontSize: '3rem',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '1rem'
      }}>
        DEI Splitter
      </h1>
      <p style={{
        fontSize: '1.25rem',
        color: '#6b7280',
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        Electricity Bill Calculator with PDF Upload
      </p>
      <p style={{
        marginTop: '2rem',
        color: '#9ca3af',
        fontSize: '0.875rem'
      }}>
        by MatExAi
      </p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
