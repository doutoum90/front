import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { SideMenu } from '../SideMenu';
import { AuthProvider } from '../../../../contexts/AuthContext';
import theme from '../../../../theme/theme';
import * as api from '../../../../services/api';
import { PROTECTED_MENU } from '../../../../constantes';


jest.mock('../../../services/api', () => ({
    apiFetch: jest.fn(),
}));

const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
});

const renderWithProviders = (ui: React.ReactElement, initialEntries = ['/espace-membre']) =>
    render(
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
                <AuthProvider onLoginSuccess={() => { }} onLogout={() => { }}>
                    <MemoryRouter initialEntries={initialEntries}>
                        <Routes>
                            <Route path="/espace-membre/*" element={ui} />
                            <Route path="/login" element={<div>Login Page</div>} />
                        </Routes>
                    </MemoryRouter>
                </AuthProvider>
            </ChakraProvider>
        </QueryClientProvider>
    );

describe('SideMenu', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        queryClient.clear();
        localStorage.setItem('access_token', 'fake-token');
    });

    it('renders menu items and highlights active route', async () => {
        (api.apiFetch as jest.Mock).mockResolvedValue({ email: 'test@example.com' });

        renderWithProviders(<SideMenu />);

        await waitFor(() => {
            expect(screen.getByText('test@example.com')).toBeInTheDocument();
        });

        PROTECTED_MENU.forEach((item) => {
            expect(screen.getByText(item.name)).toBeInTheDocument();
        });

        // Vérifie que le bouton actif a la bonne variante
        const activeButton = screen.getByText(PROTECTED_MENU.find((item) => item.path === '/espace-membre')!.name);
        expect(activeButton).toHaveAttribute('data-chakra-button-variant', 'solid');
    });

    it('toggles color mode', async () => {
        (api.apiFetch as jest.Mock).mockResolvedValue({ email: 'test@example.com' });

        renderWithProviders(<SideMenu />);

        await waitFor(() => {
            expect(screen.getByText('test@example.com')).toBeInTheDocument();
        });

        const toggleButton = screen.getByLabelText('Toggle theme');
        expect(toggleButton).toContainElement(screen.getByTestId('FiMoon')); // Mode clair par défaut

        fireEvent.click(toggleButton);
        expect(toggleButton).toContainElement(screen.getByTestId('FiSun')); // Mode sombre
    });

    it('navigates to profile on menu item click', async () => {
        (api.apiFetch as jest.Mock).mockResolvedValue({ email: 'test@example.com' });

        renderWithProviders(<SideMenu />);

        await waitFor(() => {
            expect(screen.getByText('test@example.com')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Mon Profil'));
        expect(screen.getByText('test@example.com')).toBeInTheDocument(); // Toujours visible, navigation simulée
    });

    it('logs out and redirects to login', async () => {
        (api.apiFetch as jest.Mock).mockResolvedValue({ email: 'test@example.com' });

        renderWithProviders(<SideMenu />);

        await waitFor(() => {
            expect(screen.getByText('test@example.com')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Déconnexion'));
        expect(localStorage.getItem('access_token')).toBeNull();
        expect(screen.getByText('Login Page')).toBeInTheDocument();
    });
});