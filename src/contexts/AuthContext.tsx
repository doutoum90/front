import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextType, AuthProviderProps, User } from '../types';

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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const { access_token, refresh_token, user } = await response.json();
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      setUser(user);
      onLoginSuccess();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (userData: User) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return await response.json();
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

    window.fetch = async (...args) => {
      return fetchInterceptor(args[0] as string, args[1] || {});
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    resetPassword,
    refreshAccessToken
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