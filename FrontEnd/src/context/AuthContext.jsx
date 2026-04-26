import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedRole = localStorage.getItem('role');
    
    if (savedUser && savedRole && savedUser !== 'undefined') {
      try {
        setUser(JSON.parse(savedUser));
        setRole(savedRole);
      } catch (e) {
        localStorage.removeItem('user');
        localStorage.removeItem('role');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      if (data.success) {
        setUser(data.user);
        setRole(data.role);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('role', data.role);
        return { success: true, role: data.role };
      }
    } catch (error) {
      throw error;
    }
  };

  const signup = async (userData) => {
    try {
      const data = await authService.signup(userData);
      if (data.success) {
        setUser(data.user);
        setRole(data.role);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('role', data.role);
        return { success: true, role: data.role };
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setRole(null);
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  };

  const loginWithGoogle = async () => {
    try {
      const data = await authService.loginWithGoogle();
      // If mock mode, handle it like a normal login
      if (data && data.success) {
        setUser(data.user);
        setRole(data.role);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('role', data.role);
        return { success: true, role: data.role };
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, login, signup, logout, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
