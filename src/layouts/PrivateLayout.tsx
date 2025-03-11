import { Box, Flex } from '@chakra-ui/react';
import { PrivateHeader } from '../components/protected/PrivateHeader';
import { ReactNode } from 'react';

interface PrivateLayoutProps {
    children: ReactNode;
}

export const PrivateLayout = ({ children }: PrivateLayoutProps) => {
    return (
        <Box as="section" bg="gray.50" py={{ base: '6', md: '12' }} px={{ base: '4', md: '8' }} maxW="container.xl" marginX="auto" textAlign="center">
            <PrivateHeader />
            <Flex direction="column" align="center" justify="center" minH="80vh">
                {children}
            </Flex>
            {/* Vous pouvez ajouter un pied de page ici si nécessaire */}
        </Box>
    );
};
