import { apiFetch } from './api';

export const MarketWatchService = {
    refreshToken: localStorage.getItem('refresh_token'),
    fetchMarketPrices: async (period: string) => {
        const response = await apiFetch(`/api/market-watch/prices?period=${period}`, {
            headers: { Authorization: `Bearer ${MarketWatchService.refreshToken}` },
        });
        return response.data;
    }
};