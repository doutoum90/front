import { renderHook, act } from '@testing-library/react';
import { usePasswordReset } from '../usePasswordReset';
import { useAuth } from '../../contexts/AuthContext';

jest.mock('../../contexts/AuthContext', () => ({
    useAuth: jest.fn(),
}));

describe('usePasswordReset', () => {
    const mockResetPassword = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useAuth as jest.Mock).mockReturnValue({ resetPassword: mockResetPassword });
    });

    it('submits reset request and sets success', async () => {
        mockResetPassword.mockResolvedValue(undefined);

        const { result } = renderHook(() => usePasswordReset());
        await act(async () => {
            result.current.setEmail('test@example.com');
            await result.current.handleSubmit({ preventDefault: jest.fn() } as any);
        });

        expect(mockResetPassword).toHaveBeenCalledWith('test@example.com');
        expect(result.current.success).toBe(true);
        expect(result.current.isFetching).toBe(false);
        expect(result.current.error).toBe('');
    });

    it('sets error on reset failure', async () => {
        mockResetPassword.mockRejectedValue(new Error('Reset failed'));

        const { result } = renderHook(() => usePasswordReset());
        await act(async () => {
            result.current.setEmail('test@example.com');
            await result.current.handleSubmit({ preventDefault: jest.fn() } as any);
        });

        expect(mockResetPassword).toHaveBeenCalledWith('test@example.com');
        expect(result.current.error).toBe('Une erreur est survenue lors de la réinitialisation');
        expect(result.current.isFetching).toBe(false);
        expect(result.current.success).toBe(false);
    });
});