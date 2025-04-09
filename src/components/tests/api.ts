// api.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const fetchScrapedData = async (url: string) => {
  const response = await axios.post(`${API_URL}/scraping`, { url });
  return response.data;
};