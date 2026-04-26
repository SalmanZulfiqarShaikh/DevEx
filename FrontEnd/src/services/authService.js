import api from '../utils/api';

// Toggle this to false when you want to connect to your real Node.js backend
const MOCK_MODE = false;

const authService = {
  login: async (credentials) => {
    if (MOCK_MODE) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock success response
      if (credentials.email && credentials.password) {
        return {
          success: true,
          user: { name: 'John Doe', email: credentials.email },
          role: credentials.email.includes('seller') ? 'seller' : 'buyer'
        };
      }
      throw new Error('Invalid credentials');
    }

    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  signup: async (userData) => {
    if (MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        success: true,
        user: { name: userData.name, email: userData.email },
        role: userData.role
      };
    }

    try {
      const response = await api.post('/auth/signup', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Signup failed');
    }
  },

  logout: async () => {
    if (MOCK_MODE) {
      return { success: true };
    }
    const response = await api.post('/logout');
    return response.data;
  },

  loginWithGoogle: async () => {
    if (MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        success: true,
        user: { name: 'Google User', email: 'google@user.com' },
        role: 'buyer' // Default for new Google users
      };
    }
    // Real OAuth flow usually starts by redirecting to the backend
    window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/google`;
  }
};

export default authService;
