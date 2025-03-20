import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import SuiviPayment from '../SuiviPayment';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import * as api from '../../../services/api';
import theme from '../../../theme/theme';

jest.mock('../../services/api', () => ({
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

describe('SuiviPayment', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        queryClient.clear();
    });

    it('renders loading state', () => {
        (api.apiFetch as jest.Mock).mockImplementation(() => new Promise(() => { })); // Never resolves
        render(<SuiviPayment />, { wrapper });
        expect(screen.getByRole('status')).toBeInTheDocument(); // Spinner
    });

    it('renders error state', async () => {
        (api.apiFetch as jest.Mock).mockRejectedValue(new Error('Network error'));
        render(<SuiviPayment />, { wrapper });

        await waitFor(() => {
            expect(screen.getByText('Erreur lors du chargement des données')).toBeInTheDocument();
        });
    });

    it('renders subscription data correctly', async () => {
        const mockStatus = { status: 'active' };
        const mockHistory = [{ created: 1698777600, amount_paid: 2900, status: 'paid' }];
        const mockNextPayment = { nextPaymentDate: 1701369600, amount: 2900 };

        (api.apiFetch as jest.Mock)
            .mockResolvedValueOnce(mockStatus)
            .mockResolvedValueOnce(mockHistory)
            .mockResolvedValueOnce(mockNextPayment);

        render(<SuiviPayment />, { wrapper });

        await waitFor(() => {
            expect(screen.getByText('Suivi des Paiements')).toBeInTheDocument();
            expect(screen.getByText('Statut actuel : active')).toBeInTheDocument();
            expect(screen.getByText(/Prochain prélèvement/)).toBeInTheDocument();
            expect(screen.getByText('29.00€')).toBeInTheDocument();
            expect(screen.getByText('Historique des paiements :')).toBeInTheDocument();
            expect(screen.getByText('Mettre à jour')).toBeInTheDocument();
            expect(screen.getByText('Annuler l’abonnement')).toBeInTheDocument();
        });
    });

    it('disables update button when plan is current', async () => {
        (api.apiFetch as jest.Mock)
            .mockResolvedValueOnce({ status: 'Essentiel' })
            .mockResolvedValueOnce([])
            .mockResolvedValueOnce(null);

        render(<SuiviPayment />, { wrapper });

        await waitFor(() => {
            const updateButton = screen.getByText('Mettre à jour');
            expect(updateButton).toBeDisabled();
        });
    });

    it('triggers update plan on button click', async () => {
        (api.apiFetch as jest.Mock)
            .mockResolvedValueOnce({ status: 'active' })
            .mockResolvedValueOnce([])
            .mockResolvedValueOnce(null)
            .mockResolvedValueOnce({ status: 'PRO' });

        render(<SuiviPayment />, { wrapper });

        await waitFor(() => {
            expect(screen.getByText('Statut actuel : active')).toBeInTheDocument();
        });

        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'PRO' } });
        fireEvent.click(screen.getByText('Mettre à jour'));

        await waitFor(() => {
            expect(screen.getByText('Statut actuel : PRO')).toBeInTheDocument();
        });
    });
});