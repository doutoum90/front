import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextType, AuthProviderProps, User, UserData } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children, onLoginSuccess, onLogout }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');

      if (!accessToken && !refreshToken) {
        setLoading(false);
        return;
      }

      try {
        const verifyResponse = await fetch('/api/auth/verify', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (verifyResponse.ok) {
          const userData = await verifyResponse.json();
          setUser(userData);
          setLoading(false);
          return;
        } else {
          console.log('verifyResponse', verifyResponse.ok);
        }
      } catch (error) {
        console.error('Token verification error:', error);
        logout();
        navigate('/auth/login');
      }

      if (refreshToken) {
        try {
          const refreshResponse = await fetch('/api/auth/refresh', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${refreshToken}`,
            },
          });

          if (refreshResponse.ok) {
            const { access_token } = await refreshResponse.json();
            localStorage.setItem('access_token', access_token);

            const newVerifyResponse = await fetch('/api/auth/verify', {
              headers: { Authorization: `Bearer ${access_token}` },
            });

            if (newVerifyResponse.ok) {
              const userData = await newVerifyResponse.json();
              setUser(userData);
            } else {
              throw new Error('Token verification failed after refresh');
            }
          } else {
            throw new Error('Refresh token failed');
          }
        } catch (error: any) {
          console.error('Token refresh failed:', error.message);
          logout();
          navigate('/auth/login');
        }
      } else {
        navigate('/auth/login');
      }

      setLoading(false);
    };

    verifyToken();
  }, [navigate]);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      console.log('response', response.ok);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const { access_token, refresh_token, user } = await response.json();
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      console.log('access_token', access_token);
      console.log('refresh_token', refresh_token);
      console.log('user', user);
      setUser(user);
      onLoginSuccess();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (userData: UserData & { typeAbonnement: 'Essentiel' | 'PRO' | 'Expert' }) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const { access_token, refresh_token, user } = await response.json();
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    setUser(user);
    onLoginSuccess();
  };

  const resetPassword = async (email: string) => {
    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) throw new Error('Aucun refresh token disponible');

      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}`
        }
      });


      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Échec du rafraîchissement');
      }

      const { access_token, refresh_token: newRefreshToken } = await response.json();
      localStorage.setItem('access_token', access_token);
      if (newRefreshToken) {
        localStorage.setItem('refresh_token', newRefreshToken);
      }
      return access_token;
    } catch (error) {
      logout();
      throw error;
    }
  };


  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    onLogout();
  };

  useEffect(() => {
    const originalFetch = window.fetch;

    const fetchInterceptor = async (url: string, config: RequestInit = {}) => {
      let newConfig = { ...config };

      try {
        const response = await originalFetch(url, newConfig);

        if (response.status === 401) {
          const refreshToken = localStorage.getItem('refresh_token');
          if (!refreshToken) {
            console.warn('Aucun refresh token disponible, redirection vers login');
            logout();
            navigate('/auth/login');
            throw new Error('Session expirée, veuillez vous reconnecter');
          }
  
          const newToken = await refreshAccessToken();
          newConfig.headers = {
            ...newConfig.headers,
            Authorization: `Bearer ${newToken}`,
          };
          return originalFetch(url, newConfig);
        }

        return response;
      } catch (error) {
        console.error('Fetch interceptor error:', error);
        throw error;
      }
    };

    window.fetch = async (...args) => fetchInterceptor(args[0] as string, args[1] || {});

    return () => {
      window.fetch = originalFetch;
    };
  }, [navigate]);

  const updateSubscription = async (typeAbonnement: 'Essentiel' | 'PRO' | 'Expert') => {
    const accessToken = localStorage.getItem('access_token');
    const response = await fetch('/api/user/subscription', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ typeAbonnement }),
    });

    if (!response.ok) throw new Error('Failed to update subscription');
    const updatedUser = await response.json();
    setUser(updatedUser);
  };

  const getTrialStatus = async () => {
    const accessToken = localStorage.getItem('access_token');
    const response = await fetch('/api/user/trial-status', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) throw new Error('Failed to fetch trial status');
    return response.json();
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateSubscription,
    getTrialStatus,
    register,
    resetPassword,
    refreshAccessToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};