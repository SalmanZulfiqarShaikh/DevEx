import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://devex-backend-pk.fly.dev',
  withCredentials: true, // Required for cross-origin cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
