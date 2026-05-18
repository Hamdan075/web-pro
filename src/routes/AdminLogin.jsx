import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Footer from '../components/Footer';
import { FaLock, FaExclamationCircle } from 'react-icons/fa';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate('/student-profile');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <>
      <div className="pages" style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <FaLock style={{ fontSize: '4rem', color: 'white', marginBottom: '1rem' }} />
        <h2 className="title">Admin Login</h2>
      </div>

      <section style={{ display: 'flex', justifyContent: 'center', padding: '4rem 2rem' }}>
        <div className="student-search-card" style={{ maxWidth: '500px', width: '100%' }}>
          <div className="search-card-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2>Authorized Personnel Only</h2>
            <p>Please log in to access admin features.</p>
          </div>

          {error && (
            <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaExclamationCircle /> {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="search-field">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="search-field">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="search-btn" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
              Login
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AdminLogin;
