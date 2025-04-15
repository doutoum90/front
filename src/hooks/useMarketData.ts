import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useQueries } from '@tanstack/react-query';
import { apiFetch } from '../services/api';
import { MarketData, MarketShare } from '../types';
import { useDebounce } from './useDebounce';

type QueryResult<T> = {
  data?: T
  error: unknown
  isLoading: boolean
  isError: boolean
}

export const useMarketData = (initialPeriod: string = '30j') => {
  const toast = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState(initialPeriod);
  const debouncedPeriod = useDebounce(selectedPeriod, 300); // Debounce de 300ms
  const fetchMarketData = {
    trends: () => apiFetch(`/api/veille/competitors/trends?period=${debouncedPeriod}`),
    share: () => apiFetch(`/api/veille/competitors/share`),
    prices: () => apiFetch(`/api/veille/competitors/prices?period=${debouncedPeriod}`),
  };

  const queries = useQueries({
    queries: [
      {
        queryKey: ['marketTrends', debouncedPeriod],
        queryFn: fetchMarketData.trends,
        gcTime: 5 * 60 * 1000,
      },
      {
        queryKey: ['marketShare'],
        queryFn: fetchMarketData.share,
        gcTime: 5 * 60 * 1000,
      },
      {
        queryKey: ['priceEvolution', debouncedPeriod],
        queryFn: fetchMarketData.prices,
        gcTime: 5 * 60 * 1000,
      },
    ],
  }) as [QueryResult<MarketData[]>, QueryResult<MarketShare[]>, QueryResult<MarketData[]>];

  // Gestion des erreurs dans useEffect
  useEffect(() => {
    const error = queries.find(q => q.error)?.error;
    if (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Erreur inattendue',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [queries, toast]);

  const isLoading = queries.some(q => q.isLoading);
  const isError = queries.some(q => q.isError);

  return {
    selectedPeriod,
    setSelectedPeriod,
    marketTrends: queries[0].data || [],
    marketShare: queries[1].data || [],
    priceEvolution: queries[2].data || [],
    loading: isLoading,
    error: isError ? 'Erreur lors du chargement des données' : null,
  };
};