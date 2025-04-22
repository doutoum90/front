import { apiFetch } from './api';
import { Opportunity, RegulationShort } from '../types';

const OPPORTUNITIES_API_ENDPOINTS = '/api/alerts';
const REGULATIONS_API_ENDPOINTS = '/api/regulations';

export const opportunitiesService = {
    getOpportunities: () => apiFetch(OPPORTUNITIES_API_ENDPOINTS) as Promise<Opportunity[]>,
    deleteOpportunity: (id: string) => apiFetch(`${OPPORTUNITIES_API_ENDPOINTS}/${id}`, {
        method: 'DELETE',
    }) as Promise<void>,
    getRegulations: () => apiFetch(REGULATIONS_API_ENDPOINTS) as Promise<RegulationShort[]>,
};