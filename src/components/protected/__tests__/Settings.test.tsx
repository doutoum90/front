import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { Settings } from '../Setting';
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

describe('Settings', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        queryClient.clear();
    });

    it('renders loading state', () => {
        (api.apiFetch as jest.Mock).mockImplementation(() => new Promise(() => { }));
        render(<Settings />, { wrapper });
        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders settings tabs', async () => {
        (api.apiFetch as jest.Mock).mockResolvedValue({
            avatar: 'avatar.jpg',
            name: 'Jean Dupont',
            email: 'jean@example.com',
            password: '',
            twoFactorAuth: false,
            emailNotifications: true,
            pushNotifications: false,
        });

        render(<Settings />, { wrapper });

        await waitFor(() => {
            expect(screen.getByText('Paramètres du Compte')).toBeInTheDocument();
            expect(screen.getByText('Profil')).toBeInTheDocument();
            expect(screen.getByText('Sécurité')).toBeInTheDocument();
            expect(screen.getByText('Notifications')).toBeInTheDocument();
        });
    });

    it('updates settings on input change', async () => {
        (api.apiFetch as jest.Mock).mockResolvedValue({
            avatar: 'avatar.jpg',
            name: 'Jean Dupont',
            email: 'jean@example.com',
            password: '',
            twoFactorAuth: false,
            emailNotifications: true,
            pushNotifications: false,
        });

        render(<Settings />, { wrapper });

        await waitFor(() => {
            expect(screen.getByDisplayValue('Jean Dupont')).toBeInTheDocument();
        });

        fireEvent.change(screen.getByDisplayValue('Jean Dupont'), { target: { value: 'Jean Nouveau' } });
        fireEvent.click(screen.getByText('Enregistrer'));

        await waitFor(() => {
            expect(api.apiFetch).toHaveBeenCalledWith('/api/user/settings', expect.any(Object));
        });
    });
});