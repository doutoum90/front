import {
    Flex,
    Grid,
    GridItem,
    Heading,
    Text,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Icon,
    Progress,
    Box,
    SimpleGrid,
    VStack
} from '@chakra-ui/react';
import { FaChartLine, FaUsers, FaBoxOpen } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const data = [
    { name: 'Jan', uv: 4000 },
    { name: 'Feb', uv: 3000 },
    { name: 'Mar', uv: 5000 },
    { name: 'Apr', uv: 2780 },
    { name: 'May', uv: 1890 },
    { name: 'Jun', uv: 2390 },
];
const recentActivity = [1, 2, 3];
export const Dashboard = () => {
    return (
        <Flex direction="column" p={8} bg="gray.50" minH="100vh">
            <Heading size="xl" mb={8} color="teal.600">
                Tableau de Bord
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
                <MotionBox
                    p={6}
                    bg="white"
                    borderRadius="xl"
                    boxShadow="md"
                    whileHover={{ y: -5 }}
                >
                    <Stat>
                        <StatLabel>CA Mensuel</StatLabel>
                        <StatNumber>€24,500</StatNumber>
                        <StatHelpText>
                            <Icon as={FaChartLine} mr={2} color="green.500" />
                            12% depuis le mois dernier
                        </StatHelpText>
                    </Stat>
                </MotionBox>

                <MotionBox
                    p={6}
                    bg="white"
                    borderRadius="xl"
                    boxShadow="md"
                    whileHover={{ y: -5 }}
                >
                    <Stat>
                        <StatLabel>Utilisateurs Actifs</StatLabel>
                        <StatNumber>1,234</StatNumber>
                        <StatHelpText>
                            <Icon as={FaUsers} mr={2} color="blue.500" />
                            5% de croissance
                        </StatHelpText>
                    </Stat>
                </MotionBox>

                <MotionBox
                    p={6}
                    bg="white"
                    borderRadius="xl"
                    boxShadow="md"
                    whileHover={{ y: -5 }}
                >
                    <Stat>
                        <StatLabel>Commandes</StatLabel>
                        <StatNumber>89</StatNumber>
                        <StatHelpText>
                            <Icon as={FaBoxOpen} mr={2} color="orange.500" />
                            3 en attente
                        </StatHelpText>
                    </Stat>
                </MotionBox>

                <MotionBox
                    p={6}
                    bg="white"
                    borderRadius="xl"
                    boxShadow="md"
                    whileHover={{ y: -5 }}
                >
                    <Stat>
                        <StatLabel>Objectif Mensuel</StatLabel>
                        <StatNumber>75%</StatNumber>
                        <Progress value={75} size="sm" colorScheme="teal" mt={2} />
                    </Stat>
                </MotionBox>
            </SimpleGrid>

            <Grid templateColumns={{ md: "2fr 1fr" }} gap={6}>
                <GridItem>
                    <MotionBox
                        p={6}
                        bg="white"
                        borderRadius="xl"
                        boxShadow="md"
                        height="400px"
                    >
                        <Heading size="md" mb={4}>Performance</Heading>
                        <ResponsiveContainer width="100%" height="90%">
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="uv" stroke="#319795" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </MotionBox>
                </GridItem>

                <GridItem>
                    <MotionBox
                        p={6}
                        bg="white"
                        borderRadius="xl"
                        boxShadow="md"
                        height="400px"
                    >
                        <Heading size="md" mb={4}>Activité Récente</Heading>
                        <VStack spacing={4} align="stretch">
                            {recentActivity.map((item) => (
                                <Flex key={item} p={3} bg="gray.50" borderRadius="md">
                                    <Text fontSize="sm">Nouvelle commande #00{item}</Text>
                                </Flex>
                            ))}
                        </VStack>
                    </MotionBox>
                </GridItem>
            </Grid>
        </Flex>
    );
};

export default Dashboard;