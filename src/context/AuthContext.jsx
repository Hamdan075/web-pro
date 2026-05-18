import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check local storage on mount to persist session
    const storedAuth = localStorage.getItem('isAdmin');
    if (storedAuth === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const login = (email, password) => {
    if (email === 'hamdanaslam446@gmail.com' && password === 'cam@123') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
