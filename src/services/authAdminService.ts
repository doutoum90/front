import axios from 'axios';
import { AdminUser } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const login = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/admin/auth/login`, credentials);
  return response.data;
};
export const registerAdminUser = async (credentials: { email: string; password: string, firstName: string, lastName:string }) => {
  const response = await axios.post(`${API_URL}/admin/auth/register`, credentials);
  return response.data;
};

export const fetchAdminUser = async (): Promise<AdminUser | null> => {
  const response = await axios.get(`${API_URL}/admin/auth/me`);
  return response.data;
};

export const verifyToken = async () => {
  await axios.get(`${API_URL}/admin/auth/verify`);
};

export const refreshToken = async () => {
  const response = await axios.post(`${API_URL}/admin/auth/refresh`);
  return response.data;
}; 