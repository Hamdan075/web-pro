import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const PageLoader = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
      gap: '1rem',
      color: 'var(--text-primary)'
    }}>
      <FaSpinner className="spin" style={{ fontSize: '3rem', color: 'var(--gold)' }} />
      <p style={{
        fontFamily: 'var(--font-sans)',
        letterSpacing: '1px',
        fontSize: '1rem',
        color: 'var(--text-secondary)'
      }}>Loading Page...</p>
    </div>
  );
};

export default PageLoader;
