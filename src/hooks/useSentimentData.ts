import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../services/api';

const VEILLE_API_ENDPOINTS = '/api/veille/sentiment';

export const useSentimentData = (competitorId?: string) => {
    return useQuery({
        queryKey: ['sentiment', competitorId],
        queryFn: () => apiFetch(`${VEILLE_API_ENDPOINTS}/${competitorId || ''}`)
            .then(res => res.data),
    });
};