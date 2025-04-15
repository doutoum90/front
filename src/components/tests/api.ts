
import apiFetch from '../../services/api';

export const fetchScrapedData = async (url: string) => {
  return await apiFetch('/scraping', {
    method: 'POST',
    data: JSON.stringify({ url }),
  });
};