import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Footer from '../components/Footer';
import { FaUser, FaExclamationCircle } from 'react-icons/fa';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { userLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const success = await userLogin(email, password);
      if (success) {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    }
  };

  return (
    <>
      <div className="pages" style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <FaUser style={{ fontSize: '4rem', color: 'white', marginBottom: '1rem' }} />
        <h1 className="title">User Login</h1>
      </div>

      <section style={{ display: 'flex', justifyContent: 'center', padding: '4rem 2rem' }}>
        <div className="student-search-card" style={{ maxWidth: '500px', width: '100%' }}>
          <div className="search-card-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2>Welcome Back</h2>
            <p>Please log in to your account.</p>
          </div>

          <div style={{ padding: '0 40px 40px' }}>
            {error && (
              <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaExclamationCircle /> {error}
              </div>
            )}

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
              <div className="search-field">
                <label htmlFor="user-email" style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Email Address</label>
                <input 
                  type="email" 
                  id="user-email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '10px',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '15px',
                    transition: 'all 0.3s ease'
                  }}
                  required
                />
              </div>
              
              <div className="search-field">
                <label htmlFor="user-password" style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Password</label>
                <input 
                  type="password" 
                  id="user-password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '10px',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '15px',
                    transition: 'all 0.3s ease'
                  }}
                  required
                />
              </div>

              <button type="submit" className="search-btn" style={{ width: '100%', justifyContent: 'center', marginTop: '1.8rem', padding: '14px 32px' }}>
                Login
              </button>
            </form>
            
            <div style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)' }}>
              Don't have an account? <Link to="/register" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 'bold' }}>Register</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default UserLogin;
