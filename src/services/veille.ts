import { apiFetch } from './api';

const VEILLE_API_ENDPOINTS = '/api/veille/competitors';

export const VeilleService = {
    refreshToken: localStorage.getItem('refresh_token'),
    fetchMarketTrends: async (period: string) => {
        return await apiFetch(`${VEILLE_API_ENDPOINTS}/trends?period=${period}`);
    },

    fetchMarketShare: async () => {
        return await apiFetch(`${VEILLE_API_ENDPOINTS}/share`);
    },

    fetchPriceEvolution: async (period: string) => {
        return await apiFetch(`${VEILLE_API_ENDPOINTS}/prices?period=${period}`);
    },
}