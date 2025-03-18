import axios from "axios";

const REACT_APP_API_URL = 'http://localhost:3000';
export const MarketWatchService = {
    refreshToken: localStorage.getItem('refresh_token'),
    fetchMarketPrices: async (period: string) => {
        const response = await axios.get(`${REACT_APP_API_URL}/api/market-watch/prices?period=${period}`, {
            headers: { Authorization: `Bearer ${MarketWatchService.refreshToken}` },
        });
        return response.data;
    }
};