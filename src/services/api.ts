import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const apiFetch = async (url: string, options: RequestInit = {}) => {
  const accessToken = localStorage.getItem('access_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...options.headers,
  };

  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  const response = await fetch(fullUrl, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erreur serveur' }));
    throw new ApiError(response.status, errorData.message || 'Erreur serveur');
  }
  return response.json();
};

// Axios instance si nécessaire pour d'autres parties de l'application
const api = axios.create({
  baseURL: BASE_URL
});

export default api;