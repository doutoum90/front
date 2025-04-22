import { apiFetch } from './api';

const API_ENDPOINTS = '/api/payments';

export const paymentsService = {
    getStatus: async (token: string) => {
        const response = await apiFetch(`${API_ENDPOINTS}/status`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.status;
    },

    cancelSubscription: async (token: string) => {
        await apiFetch(`${API_ENDPOINTS}/cancel`, {
            headers: { Authorization: `Bearer ${token}` },
            method: 'POST',
        });
    }
};
