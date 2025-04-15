import { apiFetch } from './api';
import { Competitor } from '../types/competitor';
import { AddCompetitorDataSourceDto } from '../types/dtos';

const API_URL = '/api/market-watch';

export class MarketWatchService {
    static async getAllCompetitors(): Promise<Competitor[]> {
        const response = await apiFetch(`${API_URL}/competitors`);
        return response.data;
    }

    static async createCompetitor(name: string, description: string, domain: string, keywords: string[], industry: string): Promise<Competitor> {
        const response = await apiFetch(`${API_URL}/competitors`, {
            method: 'POST',
            body: JSON.stringify({ name, description, domain, keywords, industry })
        });
        return response.data;
    }

    static async deleteCompetitor(id: string): Promise<void> {
        await apiFetch(`${API_URL}/competitors/${id}`, {
            method: 'DELETE'
        });
    }

    static async addDataSource(competitorId: string, dataSource: AddCompetitorDataSourceDto): Promise<Competitor> {
        delete dataSource.id;
        const response = await apiFetch(`${API_URL}/competitors/${competitorId}/data-sources`, {
            method: 'POST',
            body: JSON.stringify(dataSource)
        });
        return response.data;
    }

    static async removeDataSource(competitorId: string, dataSourceId: string): Promise<Competitor> {
        const response = await apiFetch(`${API_URL}/competitors/${competitorId}/data-sources/${dataSourceId}`, {
            method: 'DELETE'
        });
        return response.data;
    }

    static async updateDataSource(competitorId: string, dataSourceId: string, dataSource: AddCompetitorDataSourceDto): Promise<Competitor> {
        const response = await apiFetch(`${API_URL}/competitors/${competitorId}/data-sources/${dataSourceId}`, {
            method: 'PUT',
            body: JSON.stringify(dataSource)
        });
        return response.data;
    }
} 