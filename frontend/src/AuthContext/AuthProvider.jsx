import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [userEmail, setUserEmail] = useState(null);

  const login = (token,email) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
    setUserEmail(email)
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setUserEmail(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
