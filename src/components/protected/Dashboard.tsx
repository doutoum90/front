import {
    Flex,
    Heading,
    Stat,
    StatLabel,
    StatNumber,
    Icon,
    Box,
    SimpleGrid,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_DATA } from '../../constantes';

const MotionBox = motion(Box);


export const Dashboard = () => {
    const navigate = useNavigate();
    const cardBg = useColorModeValue('white', 'gray.700');
    const hoverBg = useColorModeValue('gray.50', 'gray.600');

    return (
        <Flex direction="column" p={8} bg="gray.50" minH="100vh">
            <Heading size="xl" mb={8} color="teal.600" fontWeight="bold" letterSpacing="wide">
                Tableau de Bord
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={8}>
                {DASHBOARD_DATA.map((item) => {

                    return (
                        <MotionBox
                            key={item.name}
                            onClick={() => navigate(item.path)}
                            p={6}
                            bg={cardBg}
                            borderRadius="xl"
                            boxShadow="lg"
                            whileHover={{
                                y: -5,
                                scale: 1.05,
                                boxShadow: 'xl'
                            }}
                            transition={{ duration: 0.3 }}
                            cursor="pointer"
                            _hover={{ bg: hoverBg }}
                            position="relative"
                            overflow="hidden"
                        >
                            <Stat>
                                <Flex align="center" mb={4}>
                                    <Icon
                                        as={item.icon}
                                        w={8}
                                        h={8}
                                        color={item.color}
                                        mr={4}
                                        p={2}
                                        bg={`${item.color}20`}
                                        borderRadius="md"
                                    />
                                    <StatLabel fontSize="lg" fontWeight="semibold">{item.name}</StatLabel>
                                </Flex>

                                <StatNumber fontSize="2xl" fontWeight="bold" mb={2}>
                                    {item.uv.toLocaleString()}
                                </StatNumber>

                                <Text fontSize="sm" color="gray.600" lineHeight="tall">
                                    {item.text}
                                </Text>

                                <Box
                                    position="absolute"
                                    bottom={0}
                                    left={0}
                                    right={0}
                                    height="4px"
                                    bg={`linear-gradient(90deg, ${item.color} 0%, transparent 100%)`}
                                />
                            </Stat>
                        </MotionBox>
                    );
                })}
            </SimpleGrid>
        </Flex>
    );
};

export default Dashboard;