import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@chakra-ui/react';
import { paymentsService } from '../services/paymentsService';

interface PaymentState {
    status: string;
    isLoading: boolean;
    error: string | null;
}

export const usePayments = () => {
    const [paymentState, setPaymentState] = useState<PaymentState>({
        status: '',
        isLoading: false,
        error: null
    });
    const toast = useToast();

    const fetchPaymentStatus = useCallback(async () => {
        setPaymentState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const token = localStorage.getItem('refresh_token') || '';
            const status = await paymentsService.getStatus(token);
            setPaymentState(prev => ({ ...prev, status }));
        } catch (error) {
            setPaymentState(prev => ({
                ...prev,
                error: 'Erreur lors de la vérification du statut'
            }));
            console.error('Erreur lors de la vérification du statut :', error);
        } finally {
            setPaymentState(prev => ({ ...prev, isLoading: false }));
        }
    }, []);

    const cancelSubscription = useCallback(async () => {
        setPaymentState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const token = localStorage.getItem('refresh_token') || '';
            await paymentsService.cancelSubscription(token);
            toast({
                title: 'Abonnement annulé',
                description: 'Votre abonnement a été annulé avec succès',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            await fetchPaymentStatus();
        } catch (error) {
            setPaymentState(prev => ({
                ...prev,
                error: 'Erreur lors de l\'annulation de l\'abonnement'
            }));
            console.error('Erreur lors de l\'annulation :', error);
        } finally {
            setPaymentState(prev => ({ ...prev, isLoading: false }));
        }
    }, [toast, fetchPaymentStatus]);

    useEffect(() => {
        fetchPaymentStatus();
    }, [fetchPaymentStatus]);

    return {
        ...paymentState,
        fetchPaymentStatus,
        cancelSubscription
    };
};
