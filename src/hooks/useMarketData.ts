import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useQueries } from '@tanstack/react-query';
import { apiFetch } from '../services/api';
import { MarketData, MarketShare } from '../types';
import { useDebounce } from './useDebounce';

export const useMarketData = (initialPeriod: string = '30j') => {
  const toast = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState(initialPeriod);
  const debouncedPeriod = useDebounce(selectedPeriod, 300); // Debounce de 300ms

  const fetchMarketTrends = () => apiFetch(`/api/market/trends?period=${debouncedPeriod}`);
  const fetchMarketShare = () => apiFetch('/api/market/share');
  const fetchPriceEvolution = () => apiFetch(`/api/market/price-evolution?period=${debouncedPeriod}`);

  const [trendsQuery, shareQuery, pricesQuery] = useQueries({
    queries: [
      {
        queryKey: ['marketTrends', debouncedPeriod],
        queryFn: fetchMarketTrends,
        gcTime: 5 * 60 * 1000, // 5 minutes
      },
      {
        queryKey: ['marketShare'],
        queryFn: fetchMarketShare,
        gcTime: 5 * 60 * 1000,
      },
      {
        queryKey: ['priceEvolution', debouncedPeriod],
        queryFn: fetchPriceEvolution,
        gcTime: 5 * 60 * 1000,
      },
    ],
  });

  const loading = trendsQuery.isLoading || shareQuery.isLoading || pricesQuery.isLoading;
  const error = trendsQuery.error || shareQuery.error || pricesQuery.error;

  if (error) {
    toast({
      title: 'Erreur',
      description: error instanceof Error ? error.message : 'Erreur inattendue',
      status: 'error',
    });
  }

  return {
    selectedPeriod,
    setSelectedPeriod,
    marketTrends: (trendsQuery.data as MarketData[]) || [],
    marketShare: (shareQuery.data as MarketShare[]) || [],
    priceEvolution: (pricesQuery.data as MarketData[]) || [],
    loading,
    error: error ? 'Erreur lors du chargement des données' : null,
  };
};