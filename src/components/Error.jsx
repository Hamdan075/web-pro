import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Error = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <div className="profile-card-container" style={{
        maxWidth: '550px',
        width: '100%',
        padding: '3.5rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)'
      }}>
        <img src={logo} alt="Cambridge School Crest" style={{ width: '80px', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.3))' }} />
        
        <div style={{ position: 'relative' }}>
          <h1 style={{
            fontSize: '6rem',
            margin: '0',
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, var(--gold-shiny), #ffffff, var(--gold-shiny))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '2px',
            lineHeight: 1
          }}>404</h1>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--text-primary)',
          fontSize: '1.5rem',
          margin: '0'
        }}>Lost Realm</h2>
        
        <p style={{
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          fontSize: '0.95rem',
          maxWidth: '400px',
          margin: '0'
        }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <NavLink to='/' className="search-btn" style={{
          marginTop: '1.5rem',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.8rem 1.8rem',
          fontSize: '0.95rem',
          boxShadow: '0 4px 15px rgba(212, 175, 55, 0.25)',
          background: 'linear-gradient(135deg, var(--brand), var(--brand-light))',
          color: 'white',
          border: '1px solid var(--glass-border)',
          borderRadius: '8px',
          fontWeight: 'bold',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(212, 175, 55, 0.4)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.25)';
        }}
        >
          <FaHome /> Go Back Home
        </NavLink>
      </div>
    </div>
  );
};

export default Error;