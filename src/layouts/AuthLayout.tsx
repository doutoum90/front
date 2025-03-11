import { Box, Flex } from '@chakra-ui/react';
import { AuthHeader } from '../components/auths/AuthHeader';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Box as="section" bg="gray.50" py={{ base: '6', md: '12' }} px={{ base: '4', md: '8' }} maxW="container.xl" marginX="auto" textAlign="center">
      <AuthHeader />
      <Flex direction="column" align="center" justify="center" minH="80vh">
        {children}
      </Flex>
      {/* Vous pouvez ajouter un pied de page ici si nécessaire */}
    </Box>
  );
};
