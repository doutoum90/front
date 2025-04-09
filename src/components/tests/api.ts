// api.ts
import axios from 'axios';


export const fetchScrapedData = async (url: string) => {
  const response = await axios.post(`${process.env.VITE_API_URL}/scraping`, { url });
  return response.data;
};