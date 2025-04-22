import { Competitor } from '../types';
import { apiFetch } from './api';

const API_BASE_URL = '/api/veille/competitors';

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Erreur de requête');
    }
    return response.json();
};

export const competitorsService = {
    getCompetitors: async (): Promise<Competitor[]> => {
        return apiFetch(API_BASE_URL)
            .then(handleResponse)
            .catch(error => {
                console.error('getCompetitors error:', error);
                return [];
            });
    },

    addCompetitor: async (competitor: Partial<Competitor>): Promise<Competitor> => {
        return apiFetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(competitor)
        }).then(handleResponse);
    },

    deleteCompetitor: async (id: string): Promise<void> => {
        return apiFetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        }).then(() => undefined);
    }
};