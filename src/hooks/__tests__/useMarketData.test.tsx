import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMarketData } from '../useMarketData';
import * as api from '../../services/api';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../theme/theme';

// Mock apiFetch
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

describe('useMarketData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        queryClient.clear();
    });

    it('fetches and returns market data successfully', async () => {
        const mockTrends = [{ date: '2023-01-01', value: 100 }];
        const mockShare = [{ company: 'Company A', value: 50 }];
        const mockPrices = [{ date: '2023-01-01', value: 200 }];

        (api.apiFetch as jest.Mock)
            .mockResolvedValueOnce(mockTrends)
            .mockResolvedValueOnce(mockShare)
            .mockResolvedValueOnce(mockPrices);

        const { result } = renderHook(() => useMarketData('30j'), { wrapper });

        expect(result.current.loading).toBe(true);

        await waitFor(() => expect(result.current.loading).toBe(false), { timeout: 2000 });

        expect(result.current.marketTrends).toEqual(mockTrends);
        expect(result.current.marketShare).toEqual(mockShare);
        expect(result.current.priceEvolution).toEqual(mockPrices);
        expect(result.current.error).toBeNull();
    });

    it('handles errors correctly', async () => {
        (api.apiFetch as jest.Mock).mockRejectedValue(new Error('Network error'));

        const { result } = renderHook(() => useMarketData('30j'), { wrapper });

        await waitFor(() => expect(result.current.loading).toBe(false), { timeout: 2000 });

        expect(result.current.error).toBe('Erreur lors du chargement des données');
        expect(result.current.marketTrends).toEqual([]);
        expect(result.current.marketShare).toEqual([]);
        expect(result.current.priceEvolution).toEqual([]);
    });

    it('debounces period changes', async () => {
        const mockTrends = [{ date: '2023-01-01', value: 100 }];
        (api.apiFetch as jest.Mock)
            .mockResolvedValueOnce(mockTrends)
            .mockResolvedValueOnce([])
            .mockResolvedValueOnce([]);

        const { result } = renderHook(() => useMarketData('30j'), { wrapper });

        await waitFor(() => expect(result.current.loading).toBe(false));

        // Simuler des changements rapides
        result.current.setSelectedPeriod('24h');
        result.current.setSelectedPeriod('7j');
        result.current.setSelectedPeriod('1a');

        expect(api.apiFetch).toHaveBeenCalledTimes(3); // Initial call only

        await waitFor(
            () => {
                expect(api.apiFetch).toHaveBeenCalledWith('api/veille/competitors/trends?period=1a');
            },
            { timeout: 1000 }
        );
    });
});