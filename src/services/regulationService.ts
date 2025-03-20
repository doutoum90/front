import axios from 'axios';
import { Regulation, Report } from '../types';

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('refresh_token')}` },
});

// Récupérer les réglementations
export const fetchRegulations = async (): Promise<Regulation[]> => {
  const response = await axios.get('/api/regulations', getAuthHeaders());
  return response.data;
};

// Récupérer les rapports
export const fetchReports = async (): Promise<Report[]> => {
  const response = await axios.get('/api/reports', getAuthHeaders());
  return response.data;
};

// Télécharger un rapport
export const downloadReport = async (reportId: string): Promise<void> => {
  await axios.post(`/api/reports/${reportId}/download`, null, getAuthHeaders());
};

// Créer un rapport personnalisé
export const createPersonalizedReport = async (reportData: Partial<Report>): Promise<Report> => {
  const response = await axios.post('/api/reports/request', reportData, getAuthHeaders());
  return response.data;
};