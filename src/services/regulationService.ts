import { Regulation, Report } from '../types';
import { apiFetch } from './api';

const REGULATION_API_ENDPOINTS = '/api/regulations';
const REPORT_API_ENDPOINTS = '/api/reports';

export const regulationsService = {
  fetchRegulations: () => apiFetch(REGULATION_API_ENDPOINTS) as Promise<Regulation[]>,
  fetchReports: () => apiFetch(REPORT_API_ENDPOINTS) as Promise<Report[]>,
  createPersonalizedReport: (reportData: Partial<Report>) => apiFetch(`${REGULATION_API_ENDPOINTS}/reports`, {
    method: 'POST',
    body: JSON.stringify(reportData),
  }) as Promise<void>,
  downloadReport: (reportId: string) => apiFetch(`${REPORT_API_ENDPOINTS}/${reportId}/download`, {
    method: 'GET',
    headers: { 'Accept': 'application/pdf' },
  }) as Promise<Blob>,

}