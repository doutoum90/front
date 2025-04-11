import axios from 'axios';
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

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
    Authorization: `Bearer ${accessToken}`,
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    const errorData = await response.json();
    throw new ApiError(response.status, errorData.message || 'Erreur serveur');
  }
  return response.json();
};

export default api;