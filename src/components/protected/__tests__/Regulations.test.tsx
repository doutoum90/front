import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import Regulations from '../Regulations';
import * as regulationService from '../../../services/regulationService';
import theme from '../../../theme/theme';

jest.mock('../../services/regulationService', () => ({
    fetchRegulations: jest.fn(),
    fetchReports: jest.fn(),
    createPersonalizedReport: jest.fn(),
    downloadReport: jest.fn(),
}));

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </QueryClientProvider>
);

describe('Regulations', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        queryClient.clear();
    });

    it('renders loading state', () => {
        (regulationService.fetchRegulations as jest.Mock).mockImplementation(() => new Promise(() => { }));
        render(<Regulations />, { wrapper });
        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders regulations and reports', async () => {
        (regulationService.fetchRegulations as jest.Mock).mockResolvedValue([{ title: 'Reg1', category: 'Cat1', status: 'Active' }]);
        (regulationService.fetchReports as jest.Mock).mockResolvedValue([{ name: 'Report1', description: 'Desc1' }]);

        render(<Regulations />, { wrapper });

        await waitFor(() => {
            expect(screen.getByText('Reg1')).toBeInTheDocument();
            expect(screen.getByText('Report1')).toBeInTheDocument();
        });
    });

    it('submits personalized report', async () => {
        (regulationService.fetchRegulations as jest.Mock).mockResolvedValue([]);
        (regulationService.fetchReports as jest.Mock).mockResolvedValue([]);
        (regulationService.createPersonalizedReport as jest.Mock).mockResolvedValue({ name: 'New Report' });

        render(<Regulations />, { wrapper });

        fireEvent.change(screen.getByLabelText('Nom du Rapport'), { target: { value: 'New Report' } });
        fireEvent.click(screen.getByText('Soumettre la Demande'));

        await waitFor(() => {
            expect(regulationService.createPersonalizedReport).toHaveBeenCalledWith(
                expect.objectContaining({ name: 'New Report' })
            );
        });
    });
});