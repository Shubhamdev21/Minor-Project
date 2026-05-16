import axios from 'axios';
import { useAuthStore } from '../store/useStore';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});

// Request interceptor to add the auth token header to requests
api.interceptors.request.use(
  (config) => {
    const { user } = useAuthStore.getState();
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
