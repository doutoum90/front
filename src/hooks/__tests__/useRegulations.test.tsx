import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { useRegulations } from '../useRegulations';
import * as regulationService from '../../services/regulationService';
import theme from '../../theme/theme';

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

describe('useRegulations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  it('fetches regulations and reports', async () => {
    (regulationService.fetchRegulations as jest.Mock).mockResolvedValue([{ title: 'Reg1' }]);
    (regulationService.fetchReports as jest.Mock).mockResolvedValue([{ name: 'Report1' }]);

    const { result } = renderHook(() => useRegulations(), { wrapper });

    await waitFor(() => {
      expect(result.current.regulations).toEqual([{ title: 'Reg1' }]);
      expect(result.current.reports).toEqual([{ name: 'Report1' }]);
    });
  });

  it('handles errors', async () => {
    (regulationService.fetchRegulations as jest.Mock).mockRejectedValue(new Error('Fetch error'));
    (regulationService.fetchReports as jest.Mock).mockResolvedValue([]);

    const { result } = renderHook(() => useRegulations(), { wrapper });

    await waitFor(() => {
      expect(result.current.error).toBeInstanceOf(Error);
    });
  });
});