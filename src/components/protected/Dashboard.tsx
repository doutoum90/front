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
    Box,
    SimpleGrid,
    VStack
} from '@chakra-ui/react';
import { FaChartLine } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_DATA } from '../../constantes';
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
    const navigate = useNavigate();


    return (
        <Flex direction="column" p={8} bg="gray.50" minH="100vh">
            <Heading size="xl" mb={8} color="teal.600">
                Tableau de Bord
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
                {DASHBOARD_DATA.map((item) => (
                    <MotionBox
                        key={item.name}
                        onClick={() => {
                            navigate(item.path);
                        }}
                        p={6}
                        bg="white"
                        borderRadius="xl"
                        boxShadow="md"
                        whileHover={{ y: -5 }}
                        cursor="pointer"
                    >
                        <Stat>
                            <StatLabel>{item.name}</StatLabel>
                            <StatHelpText>
                                <Icon as={FaChartLine} mr={2} color="green.500" />
                                {item.text}
                            </StatHelpText>
                        </Stat>
                    </MotionBox>
                ))}

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