import { Box, Flex } from '@chakra-ui/react';
import { PrivateHeader } from '../components/protected/PrivateHeader';
import { ReactNode } from 'react';
import { PrivateFooter } from '../components/protected/PrivateFooter';
interface PrivateLayoutProps {
    children: ReactNode;
}

export const PrivateLayout = ({ children }: PrivateLayoutProps) => {
    return (
        <Box as="section" bg="gray.50" width="100vw" minHeight="100vh" overflowX="hidden">
            <PrivateHeader />
            <Flex direction="column" align="center" justify="center" minH="80vh">
                {children}
            </Flex>
            <PrivateFooter />
        </Box>
    );
};
