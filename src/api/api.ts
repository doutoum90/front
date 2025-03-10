// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refresh_token');
      const response = await axios.post('/api/refresh-token', { refresh_token: refreshToken });
      
      localStorage.setItem('access_token', response.data.access_token);
      return api(originalRequest);
    }
    
    return Promise.reject(error);
  }
);

export default api;