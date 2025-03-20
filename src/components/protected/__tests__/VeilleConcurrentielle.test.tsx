import { render, screen, waitFor } from '@testing-library/react';
import VeilleConcurrentielle from '../VeilleConcurrentielle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../../theme/theme';
import * as api from '../../../services/api';

jest.mock('../../../services/api', () => ({
    apiFetch: jest.fn(),
}));

const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </QueryClientProvider>
);

describe('VeilleConcurrentielle', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        queryClient.clear();
    });

    it('renders loading state', () => {
        (api.apiFetch as jest.Mock).mockImplementation(() => new Promise(() => { })); // Never resolves
        render(<VeilleConcurrentielle />, { wrapper });
        expect(screen.getByRole('status')).toBeInTheDocument(); // Spinner
    });

    it('renders error state', async () => {
        (api.apiFetch as jest.Mock).mockRejectedValue(new Error('Network error'));
        render(<VeilleConcurrentielle />, { wrapper });

        await waitFor(() => {
            expect(screen.getByText('Erreur lors du chargement des données')).toBeInTheDocument();
        });
    });

    it('renders market data correctly', async () => {
        const mockTrends = [{ date: '2023-01-01', value: 100 }];
        const mockShare = [{ company: 'Company A', value: 50 }];
        const mockPrices = [{ date: '2023-01-01', value: 200 }];

        (api.apiFetch as jest.Mock)
            .mockResolvedValueOnce(mockTrends)
            .mockResolvedValueOnce(mockShare)
            .mockResolvedValueOnce(mockPrices);

        render(<VeilleConcurrentielle />, { wrapper });

        await waitFor(() => {
            expect(screen.getByText('Analyse de Marché en Temps Réel')).toBeInTheDocument();
            expect(screen.getByText('Période d\'Analyse')).toBeInTheDocument();
            expect(screen.getByText('Évolution du Marché')).toBeInTheDocument();
            expect(screen.getByText('Répartition du Marché')).toBeInTheDocument();
            expect(screen.getByText('Dynamique des Prix')).toBeInTheDocument();
            expect(screen.getByText('Company A')).toBeInTheDocument();
            expect(screen.getByText('50%')).toBeInTheDocument();
        });
    });
});