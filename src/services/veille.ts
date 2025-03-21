import { apiFetch } from './api';

export const VeilleService = {
    refreshToken: localStorage.getItem('refresh_token'),
    fetchMarketTrends: async (period: string) => {
        return await apiFetch(`/api/veille/competitors/trends?period=${period}`);
    },

    fetchMarketShare: async () => {
        return await apiFetch('/api/veille/competitors/share');
    },

    fetchPriceEvolution: async (period: string) => {
        return await apiFetch(`/api/veille/competitors/prices?period=${period}`);
    },
}