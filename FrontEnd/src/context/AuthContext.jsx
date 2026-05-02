import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount: load from localStorage, or fallback to /auth/me (for Google OAuth cookie sessions)
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedRole = localStorage.getItem('role');

    if (savedUser && savedRole && savedUser !== 'undefined') {
      try {
        setUser(JSON.parse(savedUser));
        setRole(savedRole);
        setLoading(false);
        return;
      } catch (e) {
        localStorage.removeItem('user');
        localStorage.removeItem('role');
      }
    }

    // No localStorage — try to hydrate from cookie (Google OAuth)
    axios.get('http://localhost:3000/auth/me', { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          setUser(res.data.user);
          setRole(res.data.role);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          localStorage.setItem('role', res.data.role);
        }
      })
      .catch(() => {}) // not logged in — stay as guest
      .finally(() => setLoading(false));
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
        // Do not log the user in yet. They must verify OTP.
        return { success: true };
      }
    } catch (error) {
      throw error;
    }
  };

  const verifyOTP = async (email, otp) => {
    try {
      const response = await authService.verifyOTP(email, otp);
      if (response.success) {
        setUser(response.user);
        setRole(response.role);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('role', response.role);
        return { success: true, role: response.role };
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

  const forgotPassword = async (email) => {
    try {
      return await authService.forgotPassword(email);
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (resetData) => {
    try {
      return await authService.resetPassword(resetData);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, login, signup, verifyOTP, forgotPassword, resetPassword, logout, loginWithGoogle }}>
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
