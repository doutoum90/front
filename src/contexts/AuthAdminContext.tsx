import { createContext, useContext, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { AuthAdminContextType, AuthAdminProviderProps, AdminUser } from '../types';
import * as authAdminService from '../services/authAdminService'


export const AuthAdminContext = createContext<AuthAdminContextType | undefined>(undefined);

export const AuthAdminProvider = ({ children, onLoginSuccess: onExternalLoginSuccess, onLogout: onExternalLogout }: AuthAdminProviderProps) => {
  const queryClient = useQueryClient();

  const { data: adminUser, isLoading } = useQuery<AdminUser | null, Error>({
    queryKey: ['adminUser'],
    queryFn: authAdminService.fetchAdminUser,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const refreshTokenMutation = useMutation({
    mutationFn: () => authAdminService.refreshToken(),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['adminUser'] });
      return data.access_token;
    },
    onError: () => {
      logout();
      onExternalLogout();
    },
  });

  useEffect(() => {
    const verifyToken = async () => {
      const accessToken = localStorage.getItem('admin_access_token');
      const refreshToken = localStorage.getItem('admin_refresh_token');

      if (!accessToken && !refreshToken) {
        return;
      }

      try {
        await authAdminService.verifyToken();
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
      const { adminUser } = await authAdminService.login(credentials);
      queryClient.setQueryData(['adminUser'], adminUser);
      onExternalLoginSuccess();
    },
    [queryClient, onExternalLoginSuccess]
  );

  const logout = useCallback(() => {
    localStorage.removeItem('admin_access_token');
    localStorage.removeItem('admin_refresh_token');
    queryClient.setQueryData(['adminUser'], null);
    onExternalLogout();
  }, [queryClient, onExternalLogout]);

  const refreshUser = useCallback(async () => {
    queryClient.invalidateQueries({ queryKey: ['adminUser'] });
  }, [queryClient]);

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

  const value: AuthAdminContextType = {
    adminUser: adminUser ?? null,
    isLoading,
    login,
    logout,
    refreshAccessToken: async () => {
      const { access_token } = await refreshTokenMutation.mutateAsync();
      return access_token;
    },
    refreshUser,
  };

  return <AuthAdminContext.Provider value={value}>{isLoading ? <div>Loading...</div> : children}</AuthAdminContext.Provider>;
};

export const useAuthAdmin = () => {
  const context = useContext(AuthAdminContext);
  if (!context) throw new Error('useAuthAdmin must be used within an AuthAdminProvider');
  return context;
};
