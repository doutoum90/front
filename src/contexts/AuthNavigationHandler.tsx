import { Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Box, Spinner } from '@chakra-ui/react';

export const AuthNavigationHandler = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box minH="100vh" display="flex" justifyContent="center" alignItems="center">
        <Spinner size="xl" color="brand.500" />
      </Box>
    );
  }

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Outlet />
    </Box>
  );
};