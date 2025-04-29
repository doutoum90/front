import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useQueries, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../services/api';
import { useDebounce } from './useDebounce';

const PAYMENT_API_ENDPOINTS = '/api/payments';

interface NextPayment {
  nextPaymentDate: number;
  amount: number;
}

export const useSubscription = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [newPlan, setNewPlan] = useState('Essentiel');
  const debouncedNewPlan = useDebounce(newPlan, 300);

  const fetchStatus = () => apiFetch(`${PAYMENT_API_ENDPOINTS}/status`);
  const fetchHistory = () => apiFetch(`${PAYMENT_API_ENDPOINTS}/history`);
  const fetchNextPayment = () => apiFetch(`${PAYMENT_API_ENDPOINTS}/next-payment`);

  const queries = useQueries({
    queries: [
      {
        queryKey: ['subscriptionStatus'],
        queryFn: fetchStatus,
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: ['paymentHistory'],
        queryFn: fetchHistory,
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: ['nextPayment'],
        queryFn: fetchNextPayment,
        staleTime: 5 * 60 * 1000,
      },
    ],
  });

  const [statusQuery, historyQuery, nextPaymentQuery] = queries;

  const updatePlanMutation = useMutation({
    mutationFn: (newPriceId: string) =>
      apiFetch(`${PAYMENT_API_ENDPOINTS}/upgrade-downgrade`, {
        method: 'POST',
        body: JSON.stringify({ newPriceId }),
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(['subscriptionStatus'], { status: data.status });
      toast({ title: 'Plan mis à jour', status: 'success' });
    },
    onError: (err: any) =>
      toast({
        title: 'Erreur',
        description: err instanceof Error ? err.message : 'Échec de la mise à jour',
        status: 'error',
      }),
  });

  const cancelSubscriptionMutation = useMutation({
    mutationFn: () =>
      apiFetch(`${PAYMENT_API_ENDPOINTS}/cancel`, {
        method: 'POST',
      }),
    onSuccess: () => {
      queryClient.setQueryData(['subscriptionStatus'], { status: 'canceled' });
      toast({ title: 'Abonnement annulé', status: 'success' });
    },
    onError: (err: any) =>
      toast({
        title: 'Erreur',
        description: err instanceof Error ? err.message : "Échec de l'annulation",
        status: 'error',
      }),
  });

  const loading =
    statusQuery.isPending ||
    historyQuery.isPending ||
    nextPaymentQuery.isPending ||
    updatePlanMutation.isPending ||
    cancelSubscriptionMutation.isPending;

  const error = statusQuery.error || historyQuery.error || nextPaymentQuery.error;

  useEffect(() => {
    if (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Erreur inattendue lors du chargement',
        status: 'error',
        isClosable: true,
      });
    }
  }, [error, toast]);

  return {
    status: (statusQuery.data as { status: string } | undefined)?.status || 'loading',
    paymentHistory: (historyQuery.data as any[] | undefined) || [],
    nextPayment: (nextPaymentQuery.data as NextPayment | undefined) || null,
    loading,
    error: error ? 'Erreur lors du chargement des données' : null,
    newPlan: debouncedNewPlan,
    setNewPlan,
    updatePlan: (priceId: string) => updatePlanMutation.mutate(priceId),
    cancelSubscription: () => cancelSubscriptionMutation.mutate(),
  };
};

console.log(localStorage.getItem('access_token'));