import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useQueries, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../services/api';
import { useDebounce } from './useDebounce';

interface NextPayment {
  nextPaymentDate: number;
  amount: number;
}

export const useSubscription = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [newPlan, setNewPlan] = useState('Essentiel');
  const debouncedNewPlan = useDebounce(newPlan, 300); // Debounce pour éviter des mises à jour trop rapides

  const fetchStatus = () => apiFetch('/api/payments/status');
  const fetchHistory = () => apiFetch('/api/payments/history');
  const fetchNextPayment = () => apiFetch('/api/payments/next-payment');

  const queries = useQueries({
    queries: [
      {
        queryKey: ['subscriptionStatus'],
        queryFn: fetchStatus,
        staleTime: 5 * 60 * 1000, // 5 minutes
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
      apiFetch('/api/payments/upgrade-downgrade', {
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
      apiFetch('/api/payments/cancel', {
        method: 'POST',
      }),
    onSuccess: () => {
      queryClient.setQueryData(['subscriptionStatus'], { status: 'canceled' });
      toast({ title: 'Abonnement annulé', status: 'success' });
    },
    onError: (err: any) =>
      toast({
        title: 'Erreur',
        description: err instanceof Error ? err.message : 'Échec de l’annulation',
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

  // Gestion centralisée des erreurs
  if (error) {
    toast({
      title: 'Erreur',
      description: error instanceof Error ? error.message : 'Erreur inattendue lors du chargement',
      status: 'error',
      isClosable: true,
    });
  }

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