import { Box, Flex } from '@chakra-ui/react';
import { PublicHeader } from '../components/public/PublicHeader';
import { ReactNode } from 'react';
import { PublicFooter } from '../components/public/PublicFooter';
interface PublicLayoutProps {
  children: ReactNode;
}

export const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <Box as="section" bg="gray.50" py={{ base: '6', md: '12' }} px={{ base: '4', md: '8' }} maxW="container.xl" marginX="auto" textAlign="center">
      <PublicHeader />
      <Flex direction="column" align="center" justify="center" minH="80vh">
        {children}
      </Flex>
      {/* Vous pouvez ajouter un pied de page ici si nécessaire */}
      <PublicFooter />
    </Box>
  );
};
