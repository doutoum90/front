import { User, UserData } from '../types';

interface LoginResponse {
    access_token: string;
    refresh_token: string;
    user: User;
}

interface RefreshTokenResponse {
    access_token: string;
    refresh_token?: string;
}

// Fonction utilitaire pour gérer les erreurs de réponse
const handleApiError = async (response: Response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur API');
    }
    return response;
};

// Récupérer les données utilisateur
export const fetchUser = async (): Promise<User | null> => {
    const token = localStorage.getItem('access_token');
    if (!token) return null;
    return fetch('/api/user', {
        headers: { Authorization: `Bearer ${token}` },
    })
        .then(handleApiError)
        .then((res) => res.json());
};

// Vérifier le token
export const verifyToken = async (accessToken: string): Promise<void> => {
    await fetch('/api/auth/verify', {
        headers: { Authorization: `Bearer ${accessToken}` },
    }).then(handleApiError);
};

// Rafraîchir le token
export const refreshToken = async (refreshToken: string): Promise<RefreshTokenResponse> => {
    const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${refreshToken}`,
        },
    });
    await handleApiError(response);
    const data = await response.json();
    localStorage.setItem('access_token', data.access_token);
    if (data.refresh_token) localStorage.setItem('refresh_token', data.refresh_token);
    return data;
};

// Connexion
export const login = async (credentials: { email: string; password: string }): Promise<LoginResponse> => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    await handleApiError(response);
    const data = await response.json();
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    return data;
};

// Inscription
export const register = async (
    userData: UserData & { typeAbonnement: 'Essentiel' | 'PRO' | 'Expert' }
): Promise<LoginResponse> => {
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    await handleApiError(response);
    const data = await response.json();
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    return data;
};

// Réinitialisation du mot de passe
export const resetPassword = async (email: string): Promise<void> => {
    const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });
    await handleApiError(response);
};

// Mise à jour de l’abonnement
export const updateSubscription = async (typeAbonnement: 'Essentiel' | 'PRO' | 'Expert'): Promise<User> => {
    const accessToken = localStorage.getItem('access_token');
    const response = await fetch('/api/user/subscription', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ typeAbonnement }),
    });
    await handleApiError(response);
    return response.json();
};

// Statut d’essai
export const getTrialStatus = async (): Promise<any> => {
    const accessToken = localStorage.getItem('access_token');
    const response = await fetch('/api/user/trial-status', {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    await handleApiError(response);
    return response.json();
};