import React, { createContext, useContext, useState } from 'react';
import UseStorageState from "../servicios/UseStorageState";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = UseStorageState("usuario",null);
  const [esAdmin, setEsAdmin] = useState(false)

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
  const admin = (userData) => setEsAdmin(userData)

  return (
    <AuthContext.Provider value={{ user, login, logout, esAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
