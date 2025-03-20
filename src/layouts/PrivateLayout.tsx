import { Box, Flex } from '@chakra-ui/react';
import { PrivateHeader } from '../components/protected/commons/PrivateHeader';
import { PrivateFooter } from '../components/protected/commons/PrivateFooter';
import { SideMenu } from '../components/protected/commons/SideMenu';
import { PrivateLayoutProps } from '../types';


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
