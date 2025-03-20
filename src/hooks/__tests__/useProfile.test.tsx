import { renderHook, act } from '@testing-library/react';
import { useProfile } from '../useProfile';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

jest.mock('../../contexts/AuthContext', () => ({
    useAuth: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('useProfile', () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    });

    it('formats date correctly', () => {
        (useAuth as jest.Mock).mockReturnValue({
            user: { createdAt: '2023-01-15T00:00:00Z' },
        });
        const { result } = renderHook(() => useProfile());
        expect(result.current.formatDate(result.current.user?.createdAt)).toBe('Membre depuis 15/01/2023');
    });

    it('navigates to settings on edit profile', () => {
        (useAuth as jest.Mock).mockReturnValue({ user: {} });
        const { result } = renderHook(() => useProfile());
        act(() => {
            result.current.handleEditProfile();
        });
        expect(mockNavigate).toHaveBeenCalledWith('/espace-membre/settings');
    });

    it('returns empty string for undefined date', () => {
        (useAuth as jest.Mock).mockReturnValue({ user: {} });
        const { result } = renderHook(() => useProfile());
        expect(result.current.formatDate(undefined)).toBe('');
    });
});