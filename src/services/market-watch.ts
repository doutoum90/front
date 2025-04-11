import axios from "axios";

export const MarketWatchService = {
    refreshToken: localStorage.getItem('refresh_token'),
    fetchMarketPrices: async (period: string) => {
        const response = await axios.get(`${process.env.VITE_API_URL}/api/market-watch/prices?period=${period}`, {
            headers: { Authorization: `Bearer ${MarketWatchService.refreshToken}` },
        });
        return response.data;
    }
};