import { apiFetch } from "./api";
import { Opportunity, RegulationShort } from "../types";

export const opportunitiesService = {
    getOpportunities: () => apiFetch('/api/alerts') as Promise<Opportunity[]>,
    getRegulations: () => apiFetch('/api/regulations') as Promise<RegulationShort[]>,
    deleteOpportunity: (id: string) => apiFetch(`/api/alerts/${id}`, {
        method: 'DELETE',
    }) as Promise<void>,
};