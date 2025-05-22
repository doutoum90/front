import { createContext, useContext, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { AuthContextType, AuthProviderProps, User, UserData } from '../types';
import * as authService from '../services/authService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children, onLoginSuccess: onExternalLoginSuccess, onLogout: onExternalLogout }: AuthProviderProps) => {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery<User | null, Error>({
    queryKey: ['user'],
    queryFn: authService.fetchUser,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const refreshTokenMutation = useMutation({
    mutationFn: () => authService.refreshToken(),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      return data.access_token;
    },
    onError: () => {
      logout();
      onExternalLogout();
    },
  });

  useEffect(() => {
    const verifyToken = async () => {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');

      if (!accessToken && !refreshToken) {
        return;
      }

      try {
        await authService.verifyToken();
      } catch (error) {
        if (refreshToken) {
          await refreshTokenMutation.mutateAsync();
        } else {
          console.error('Token verification error:', error);
          logout();
          onExternalLogout();
        }
      }
    };

    verifyToken();
  }, [queryClient, refreshTokenMutation]);

  const login = useCallback(
    async (credentials: { email: string; password: string }) => {
      const { user } = await authService.login(credentials);
      queryClient.setQueryData(['user'], user);
      onExternalLoginSuccess();
    },
    [queryClient, onExternalLoginSuccess]
  );

  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    queryClient.setQueryData(['user'], null);
    onExternalLogout();
  }, [queryClient, onExternalLogout]);

  const register = useCallback(
    async (userData: UserData & { typeAbonnement: 'Essentiel' | 'PRO' | 'Expert' }) => {
      const { user } = await authService.register(userData);
      queryClient.setQueryData(['user'], user);
    },
    [queryClient]
  );

  const resetPassword = useCallback(async (email: string) => {
    await authService.resetPassword(email);
  }, []);

  const refreshUser = useCallback(async () => {
    queryClient.invalidateQueries({ queryKey: ['user'] });
  }, [queryClient]);

  const updateSubscription = useCallback(
    async (typeAbonnement: 'Essentiel' | 'PRO' | 'Expert') => {
      const updatedUser = await authService.updateSubscription(typeAbonnement);
      queryClient.setQueryData(['user'], updatedUser);
    },
    [queryClient]
  );

  const getTrialStatus = useCallback(async () => {
    return authService.getTrialStatus();
  }, []);

  useEffect(() => {
    const originalFetch = window.fetch;
    let isRefreshing = false;
    let refreshPromise: Promise<{ access_token: string }> | null = null;

    window.fetch = async (url, config = {}) => {
      const newConfig = { ...config };
      const response = await originalFetch(url, newConfig);

      if (response.status === 401 && !url.toString().includes('/auth/refresh')) {
        if (isRefreshing) {
          // Si un refresh est déjà en cours, on attend qu'il se termine
          const { access_token: newToken } = await refreshPromise!;
          newConfig.headers = { ...newConfig.headers, Authorization: `Bearer ${newToken}` };
          return originalFetch(url, newConfig);
        }

        try {
          isRefreshing = true;
          refreshPromise = refreshTokenMutation.mutateAsync();
          const { access_token: newToken } = await refreshPromise;
          newConfig.headers = { ...newConfig.headers, Authorization: `Bearer ${newToken}` };
          return originalFetch(url, newConfig);
        } catch (error) {
          logout();
          onExternalLogout();
          throw error;
        } finally {
          isRefreshing = false;
          refreshPromise = null;
        }
      }
      return response;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [refreshTokenMutation, logout, onExternalLogout]);

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    updateSubscription,
    getTrialStatus,
    register,
    resetPassword,
    refreshAccessToken: async () => {
      const { access_token } = await refreshTokenMutation.mutateAsync();
      return access_token;
    },
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{isLoading ? <div>Loading...</div> : children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};