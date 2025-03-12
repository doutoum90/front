import { Box, Flex } from '@chakra-ui/react';
import { PublicHeader } from '../components/public/PublicHeader';
import { ReactNode } from 'react';
import { PublicFooter } from '../components/public/PublicFooter';
interface PublicLayoutProps {
  children: ReactNode;
}

export const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <Box as="section" bg="gray.50" width="100vw" minHeight="100vh" overflowX="hidden">
      <PublicHeader />
      <Flex direction="column" width="100%" flex={1} px={{ base: 4, md: 8 }}>
        {children}
      </Flex>
      <PublicFooter />
    </Box>
  );
};
