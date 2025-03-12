import { Box, Flex } from '@chakra-ui/react';
import { PublicHeader } from '../components/public/PublicHeader';
import { ReactNode } from 'react';
import { PublicFooter } from '../components/public/PublicFooter';
interface PublicLayoutProps {
  children: ReactNode;
}

export const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <Box as="section" bg="gray.50" maxW="100%" marginX="0" textAlign="center">
      <PublicHeader />
      <Flex direction="column" justify="center" width="100%">
        {children}
      </Flex>
      {/* Vous pouvez ajouter un pied de page ici si nécessaire */}
      <PublicFooter />
    </Box>
  );
};
