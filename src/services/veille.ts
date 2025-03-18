import axios from 'axios';

const REACT_APP_API_URL = 'http://localhost:3000';

export const VeilleService = {
    refreshToken: localStorage.getItem('refresh_token'),
    fetchMarketTrends: async (period: string) => {
        const response = await axios.get(`${REACT_APP_API_URL}/api/veille/competitors/trends?period=${period}`, {
            headers: { Authorization: `Bearer ${VeilleService.refreshToken}` },
        });
        return response.data;
    },

    fetchMarketShare: async () => {
        const response = await axios.get(`${REACT_APP_API_URL}/api/veille/competitors/share`, {
            headers: { Authorization: `Bearer ${VeilleService.refreshToken}` },
        });
        return response.data;
    },

    fetchPriceEvolution: async (period: string) => {
        const response = await axios.get(`${REACT_APP_API_URL}/api/veille/competitors/prices?period=${period}`, {
            headers: { Authorization: `Bearer ${VeilleService.refreshToken}` },
        });
        return response.data;
    }
}