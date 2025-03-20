import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthNavigationHandler } from '../AuthNavigationHandler';
import { AuthProvider } from '../AuthContext';
import theme from '../../theme/theme';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
            <AuthProvider onLoginSuccess={() => { }} onLogout={() => { }}>
                {children}
            </AuthProvider>
        </ChakraProvider>
    </QueryClientProvider>
);

describe('AuthNavigationHandler', () => {
    it('redirects to login when not authenticated', async () => {
        render(
            <MemoryRouter initialEntries={['/espace-membre/dashboard']}>
                <Routes>
                    <Route path="/espace-membre/*" element={<AuthNavigationHandler />} />
                    <Route path="/auth/login" element={<div>Login Page</div>} />
                </Routes>
            </MemoryRouter>,
            { wrapper }
        );

        await waitFor(() => {
            expect(screen.getByText('Login Page')).toBeInTheDocument();
        });
    });

    it('redirects to dashboard when authenticated', async () => {
        queryClient.setQueryData(['user'], { email: 'test@example.com' });

        render(
            <MemoryRouter initialEntries={['/auth/login']}>
                <Routes>
                    <Route path="/auth/*" element={<AuthNavigationHandler />} />
                    <Route path="/espace-membre/dashboard" element={<div>Dashboard</div>} />
                </Routes>
            </MemoryRouter>,
            { wrapper }
        );

        await waitFor(() => {
            expect(screen.getByText('Dashboard')).toBeInTheDocument();
        });
    });
});