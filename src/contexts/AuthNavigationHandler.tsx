import { useNavigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { Box } from '@chakra-ui/react';
import { useCallback } from 'react';

export const AuthNavigationHandler = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = useCallback(() => {
    navigate('/espace-membre/dashboard');
  }, [navigate]);

  const handleLogout = useCallback(() => {
    navigate('/auth/login');
  }, [navigate]);

  return (
    <AuthProvider
      onLoginSuccess={handleLoginSuccess}
      onLogout={handleLogout}
    >
      <Box minH="100vh" display="flex" flexDirection="column">
        <Outlet /> {/* Point de rendu des routes enfants */}
      </Box>
    </AuthProvider>
  );
};