import { Box, Flex } from '@chakra-ui/react';
import { PrivateHeader } from '../components/protected/PrivateHeader';
import { PrivateFooter } from '../components/protected/PrivateFooter';
import { SideMenu } from '../components/protected/SideMenu';
import { ReactNode } from 'react';

interface PrivateLayoutProps {
    children: ReactNode;
}

export const PrivateLayout = ({ children }: PrivateLayoutProps) => {
    return (
        <Box as="section" bg="gray.50" width="100vw" minHeight="100vh" overflowX="hidden">
            <PrivateHeader />
            <Flex>
                <SideMenu />
                <Box flex="1" ml="250px" p={4}>
                    <Flex direction="column" align="center" justify="center" minH="80vh">
                        {children}
                    </Flex>
                    <PrivateFooter />
                </Box>
            </Flex>
        </Box>
    );
};
