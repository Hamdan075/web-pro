import React, { createContext, useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(() => {
    const token = localStorage.getItem('token');
    const adminFlag = localStorage.getItem('isAdmin') === 'true';
    return !!token && adminFlag;
  });

  const [isUser, setIsUser] = useState(() => {
    const token = localStorage.getItem('token');
    const userFlag = localStorage.getItem('isUser') === 'true';
    return !!token && userFlag;
  });

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to login');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('isAdmin', 'true');
      setIsAdmin(true);
      return true;
    } catch (err) {
      console.error('Login error:', err.message);
      throw err;
    }
  };

  const userLogin = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE}/auth/user-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to login');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('isUser', 'true');
      setIsUser(true);
      return true;
    } catch (err) {
      console.error('Login error:', err.message);
      throw err;
    }
  };

  const userRegister = async (name, email, password) => {
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to register');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('isUser', 'true');
      setIsUser(true);
      return true;
    } catch (err) {
      console.error('Registration error:', err.message);
      throw err;
    }
  };

  const logout = () => {
    setIsAdmin(false);
    setIsUser(false);
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isUser');
    localStorage.removeItem('token');
  };

  // Re-validate token presence on start
  useEffect(() => {
    const token = localStorage.getItem('token');
    const adminFlag = localStorage.getItem('isAdmin') === 'true';
    const userFlag = localStorage.getItem('isUser') === 'true';
    
    if (!token) {
      logout();
    } else if (!adminFlag && !userFlag) {
      logout();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAdmin, isUser, login, userLogin, userRegister, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
