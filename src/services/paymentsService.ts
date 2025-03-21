import { apiFetch } from "./api";

const API_ENDPOINTS = {
    STATUS: '/api/payments/status',
    CANCEL: '/api/payments/cancel'
};

export const paymentsService = {
    getStatus: async (token: string) => {
        const response = await apiFetch(API_ENDPOINTS.STATUS, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.status;
    },

    cancelSubscription: async (token: string) => {
        await apiFetch(API_ENDPOINTS.CANCEL, {
            headers: { Authorization: `Bearer ${token}` },
            method: 'POST',
        });
    }
};
