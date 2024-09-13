import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [Token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Pass token and authentication state down through context
  const value = {
    Token,
    setToken,
    isAuthenticated,
    setIsAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;