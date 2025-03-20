import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { useSubscription } from '../useSubscription';
import * as api from '../../services/api';
import theme from '../../theme/theme';

jest.mock('../../services/api', () => ({
    apiFetch: jest.fn(),
}));

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </QueryClientProvider>
);

describe('useSubscription', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        queryClient.clear();
    });

    it('fetches subscription data successfully', async () => {
        const mockStatus = { status: 'active' };
        const mockHistory = [{ created: 1698777600, amount_paid: 2900, status: 'paid' }];
        const mockNextPayment = { nextPaymentDate: 1701369600, amount: 2900 };

        (api.apiFetch as jest.Mock)
            .mockResolvedValueOnce(mockStatus)
            .mockResolvedValueOnce(mockHistory)
            .mockResolvedValueOnce(mockNextPayment);

        const { result } = renderHook(() => useSubscription(), { wrapper });

        expect(result.current.loading).toBe(true);

        await waitFor(() => expect(result.current.loading).toBe(false), { timeout: 2000 });

        expect(result.current.status).toBe('active');
        expect(result.current.paymentHistory).toEqual(mockHistory);
        expect(result.current.nextPayment).toEqual(mockNextPayment);
        expect(result.current.error).toBeNull();
    });

    it('handles errors correctly', async () => {
        (api.apiFetch as jest.Mock).mockRejectedValue(new Error('Network error'));

        const { result } = renderHook(() => useSubscription(), { wrapper });

        await waitFor(() => expect(result.current.loading).toBe(false), { timeout: 2000 });

        expect(result.current.error).toBe('Erreur lors du chargement des données');
        expect(result.current.status).toBe('loading');
        expect(result.current.paymentHistory).toEqual([]);
        expect(result.current.nextPayment).toBeNull();
    });

    it('updates plan successfully', async () => {
        (api.apiFetch as jest.Mock)
            .mockResolvedValueOnce({ status: 'active' })
            .mockResolvedValueOnce([])
            .mockResolvedValueOnce(null)
            .mockResolvedValueOnce({ status: 'PRO' });

        const { result } = renderHook(() => useSubscription(), { wrapper });

        await waitFor(() => expect(result.current.loading).toBe(false));

        result.current.setNewPlan('PRO');
        result.current.updatePlan('price_pro');

        await waitFor(() => expect(result.current.status).toBe('PRO'), { timeout: 2000 });
    });

    it('cancels subscription successfully', async () => {
        (api.apiFetch as jest.Mock)
            .mockResolvedValueOnce({ status: 'active' })
            .mockResolvedValueOnce([])
            .mockResolvedValueOnce(null)
            .mockResolvedValueOnce({});

        const { result } = renderHook(() => useSubscription(), { wrapper });

        await waitFor(() => expect(result.current.loading).toBe(false));

        result.current.cancelSubscription();

        await waitFor(() => expect(result.current.status).toBe('canceled'), { timeout: 2000 });
    });
});