import { renderHook, act } from '@testing-library/react';
import { useLogin } from '../useLogin';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

jest.mock('../../contexts/AuthContext', () => ({
    useAuth: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('useLogin', () => {
    const mockLogin = jest.fn();
    const mockNavigate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useAuth as jest.Mock).mockReturnValue({ login: mockLogin });
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    });

    it('submits login and navigates on success', async () => {
        mockLogin.mockResolvedValue(undefined);

        const { result } = renderHook(() => useLogin());
        await act(async () => {
            result.current.setEmail('test@example.com');
            result.current.setPassword('password');
            await result.current.handleSubmit({ preventDefault: jest.fn() } as any);
        });

        expect(mockLogin).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
        expect(mockNavigate).toHaveBeenCalledWith('/espace-membre/dashboard');
        expect(result.current.isFetching).toBe(false);
        expect(result.current.error).toBe('');
    });

    it('sets error on login failure', async () => {
        mockLogin.mockRejectedValue(new Error('Login failed'));

        const { result } = renderHook(() => useLogin());
        await act(async () => {
            result.current.setEmail('test@example.com');
            result.current.setPassword('password');
            await result.current.handleSubmit({ preventDefault: jest.fn() } as any);
        });

        expect(mockLogin).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
        expect(result.current.error).toBe('Identifiants incorrects ou problème de connexion');
        expect(result.current.isFetching).toBe(false);
    });
});