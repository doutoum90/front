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
  console.log('Token utilisé:', accessToken); // Debug du token

  console.log('url ---->', url, !['/api/user', '/api/auth/login'].includes(url));
  if (!['/api/user', '/api/auth/login'].includes(url)) {
    if (!accessToken) {
      console.warn('Aucun token d\'accès trouvé dans le localStorage');
      throw new ApiError(401, 'Non authentifié');
    }
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
    ...options.headers,
  };

  console.log('Headers de la requête:', headers); // Debug des headers

  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  const response = await fetch(fullUrl, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erreur serveur' }));
    console.error('Réponse d\'erreur:', {
      status: response.status,
      statusText: response.statusText,
      error: errorData
    }); // Debug de l'erreur
    throw new ApiError(response.status, errorData.message || 'Erreur serveur');
  }
  return response.json();
};

// Axios instance si nécessaire pour d'autres parties de l'application
const api = axios.create({
  baseURL: BASE_URL
});

export default api;