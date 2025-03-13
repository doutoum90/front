import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
type User = {
  createdAt?: string;
  name?: string;
  lastname?: string;
  email: string;
  password?: string;
  dateOfBirth?: string;
  profession?: string;
  skills?: string[];
  typeAbonnement?: string[];
  // Ajoutez d'autres propriétés utilisateur au besoin
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: User) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  refreshAccessToken: () => Promise<string>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
  onLoginSuccess: () => void;
  onLogout: () => void;
};

export const AuthProvider = ({ children, onLoginSuccess, onLogout }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const verifyToken = async () => {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');

      // Si aucun token n'est présent
      if (!accessToken && !refreshToken) {
        setLoading(false);
        return;
      }

      try {
        // Vérification initiale du token
        const verifyResponse = await fetch('/api/auth/verify', {
          headers: { Authorization: `Bearer ${accessToken}` }
        });

        if (verifyResponse.ok) {
          const userData = await verifyResponse.json();
          setUser(userData);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error('Token verification error:', error);
      }

      // Si le token est invalide ou expiré, tenter le rafraîchissement
      if (refreshToken) {
        try {
          const refreshResponse = await fetch('/api/auth/refresh', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${refreshToken}`
            }
          });

          if (refreshResponse.ok) {
            const { access_token } = await refreshResponse.json();

            // Mettre à jour le token dans le localStorage
            localStorage.setItem('access_token', access_token);

            // Relancer la vérification avec le nouveau token
            const newVerifyResponse = await fetch('/api/auth/verify', {
              headers: { Authorization: `Bearer ${access_token}` }
            });

            if (newVerifyResponse.ok) {
              const userData = await newVerifyResponse.json();
              setUser(userData);
            }
          } else {
            // Si le refresh échoue, déconnecter l'utilisateur
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            navigate('/auth/login');
          }
        } catch (error) {
          console.error('Refresh token error:', error);
          navigate('/auth/login');
        }
      } else {
        navigate('/auth/login');
      }

      setLoading(false);
    };

    verifyToken();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
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
      body: JSON.stringify(userData)
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
      body: JSON.stringify({ email })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}`
        }
      });

      const { access_token } = await response.json();
      localStorage.setItem('access_token', access_token);
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
