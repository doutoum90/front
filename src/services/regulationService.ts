import { Regulation, Report } from '../types';
import { apiFetch } from './api';

export const regulationsService = {
  fetchRegulations: () => apiFetch('/api/regulations') as Promise<Regulation[]>,

  fetchReports: () => apiFetch('/api/reports') as Promise<Report[]>,

  createPersonalizedReport: (reportData: Partial<Report>) => apiFetch('/api/reports', {
    method: 'POST',
    body: JSON.stringify(reportData),
  }) as Promise<void>,
  downloadReport: (reportId: string) => apiFetch(`/api/reports/${reportId}/download`, {
    method: 'GET',
    headers: { 'Accept': 'application/pdf' },
  }) as Promise<Blob>,

}