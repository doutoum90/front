import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export interface StaticPage {
  id: string;
  title: string;
  slug: string;
  content: string;
}

export const getStaticPages = async (): Promise<StaticPage[]> => {
  const response = await axios.get(`${API_URL}/static-pages`);
  return response.data;
};

export const getStaticPage = async (id: string): Promise<StaticPage> => {
  const response = await axios.get(`${API_URL}/static-pages/${id}`);
  return response.data;
};

export const createStaticPage = async (page: Omit<StaticPage, 'id'>): Promise<StaticPage> => {
  const response = await axios.post(`${API_URL}/static-pages`, page);
  return response.data;
};

export const updateStaticPage = async (id: string, page: Partial<StaticPage>): Promise<StaticPage> => {
  const response = await axios.put(`${API_URL}/static-pages/${id}`, page);
  return response.data;
};

export const deleteStaticPage = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/static-pages/${id}`);
};

export const getStaticPageBySlug = async (slug: string): Promise<StaticPage> => {
  const response = await axios.get(`${API_URL}/static-pages/slug/${slug}`);
  return response.data;
}; 