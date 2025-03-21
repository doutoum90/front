import { User, UserData } from '../types';
import { apiFetch } from './api'

interface LoginResponse {
    access_token: string;
    refresh_token: string;
    user: User;
}

interface RefreshTokenResponse {
    access_token: string;
    refresh_token?: string;
}


// Récupérer les données utilisateur
export const fetchUser = async (): Promise<User | null> => {
    return await apiFetch('/api/user');
};

// Vérifier le token
export const verifyToken = async (): Promise<void> => {
    await apiFetch('/api/auth/verify');
};

// Rafraîchir le token
export const refreshToken = async (): Promise<RefreshTokenResponse> => {
    const data = await apiFetch('/api/auth/refresh', {
        method: 'POST',
    });
    localStorage.setItem('access_token', data.access_token);
    if (data.refresh_token) localStorage.setItem('refresh_token', data.refresh_token);
    return data;
};

// Connexion
export const login = async (credentials: { email: string; password: string }): Promise<LoginResponse> => {
    const response = await apiFetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
    return response;
};

// Inscription
export const register = async (
    userData: UserData & { typeAbonnement: 'Essentiel' | 'PRO' | 'Expert' }
): Promise<LoginResponse> => {
    const data = await apiFetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    return data;
};

// Réinitialisation du mot de passe
export const resetPassword = async (email: string): Promise<void> => {
    await apiFetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });
};

// Mise à jour de l’abonnement
export const updateSubscription = async (typeAbonnement: 'Essentiel' | 'PRO' | 'Expert'): Promise<User> => {
    return await apiFetch('/api/user/subscription', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ typeAbonnement }),
    });
};

// Statut d’essai
export const getTrialStatus = async (): Promise<any> => {
    return await apiFetch('/api/user/trial-status');
};