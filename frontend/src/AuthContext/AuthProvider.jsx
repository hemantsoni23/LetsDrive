import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  const login = (email) => {
    setAuthToken(true);
    setUserEmail(email);
  };

  const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    // Cookies.remove('role');
    setAuthToken(false);
    setUserEmail(null);
  };

  useEffect(() => {
    const checkToken = async () => {
      let token = Cookies.get('accessToken');
      let refreshToken = Cookies.get('refreshToken');
      if (!token && refreshToken) {
        // Attempt to refresh the access token
        try {
          await axios.get(`${process.env.REACT_APP_API_ROUTE}/users/refresh-token`,{ withCredentials: true });
          setAuthToken(true);
        } catch (error) {
          console.error("Couldn't refresh token", error);
          logout();
        }
      } else if(token) { 
        setAuthToken(true);
      }
    };

    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
