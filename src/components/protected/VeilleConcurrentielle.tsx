import {
    useState,
    useEffect
} from 'react';
import {
    Flex,
    Heading,
    Text,
    SimpleGrid,
    useColorModeValue,
    Box,
    Tag,
    Spinner,
    Alert,
    AlertIcon,
    Progress
} from '@chakra-ui/react';
import {
    FaChartLine,
    FaChartPie,
    FaFilter,
    FaDollarSign,
    FaCalendarAlt
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryBar } from 'victory';
import { Icon } from '@chakra-ui/react';
import { VeilleService } from '../../services/veille';
import { MarketData, MarketShare } from '../../types';
const MotionBox = motion(Box);



const VeilleConcurrentielle = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('30j');
    const [marketTrends, setMarketTrends] = useState<MarketData[]>([]);
    const [marketShare, setMarketShare] = useState<MarketShare[]>([]);
    const [priceEvolution, setPriceEvolution] = useState<MarketData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [trends, share, prices] = await Promise.all([
                    VeilleService.fetchMarketTrends(selectedPeriod),
                    VeilleService.fetchMarketShare(),
                    VeilleService.fetchPriceEvolution(selectedPeriod)
                ]);

                setMarketTrends(trends);
                setMarketShare(share);
                setPriceEvolution(prices);
            } catch (err) {
                setError('Erreur lors du chargement des données');
                console.error('API Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedPeriod]);

    const cardBg = useColorModeValue('white', 'gray.700');
    const iconColors = ['teal.500', 'purple.500', 'orange.500', 'blue.500'];

    if (loading) {
        return (
            <Flex justify="center" align="center" minH="100vh">
                <Spinner size="xl" color="teal.500" />
            </Flex>
        );
    }

    if (error) {
        return (
            <Alert status="error" variant="subtle" flexDirection="column" alignItems="center">
                <AlertIcon boxSize="40px" mr={0} />
                <Text mt={4} mb={1} fontSize="lg">
                    {error}
                </Text>
            </Alert>
        );
    }

    return (
        <Flex p={8} bg="gray.50" minH="100vh" direction="column">
            <Heading size="xl" mb={8} color="teal.600" fontWeight="bold">
                <FaCalendarAlt style={{ display: 'inline-block', marginRight: '12px' }} />
                Analyse de Marché en Temps Réel
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={6}>
                {/* Filtre par période */}
                <MotionBox
                    p={6}
                    bg={cardBg}
                    borderRadius="xl"
                    boxShadow="lg"
                    whileHover={{ y: -5 }}
                    cursor="pointer"
                >
                    <Flex align="center" mb={4}>
                        <Icon as={FaFilter} w={8} h={8} color={iconColors[0]} mr={4} />
                        <Heading size="md">Période d'Analyse</Heading>
                    </Flex>
                    <Flex wrap="wrap" gap={2}>
                        {['24h', '7j', '30j', '1a'].map((period) => (
                            <Tag
                                key={period}
                                colorScheme={period === selectedPeriod ? 'teal' : 'gray'}
                                px={4}
                                py={2}
                                _hover={{ bg: 'teal.100' }}
                                onClick={() => setSelectedPeriod(period)}
                            >
                                {period}
                            </Tag>
                        ))}
                    </Flex>
                </MotionBox>

                {/* Tendances du marché */}
                <MotionBox
                    p={6}
                    bg={cardBg}
                    borderRadius="xl"
                    boxShadow="lg"
                    whileHover={{ y: -5 }}
                >
                    <Flex align="center" mb={4}>
                        <Icon as={FaChartLine} w={8} h={8} color={iconColors[1]} mr={4} />
                        <Heading size="md">Évolution du Marché</Heading>
                    </Flex>
                    <VictoryChart theme={VictoryTheme.material}>
                        <VictoryLine
                            data={marketTrends}
                            style={{ data: { stroke: "#4FD1C5" } }}
                            animate={{ duration: 2000 }}
                        />
                    </VictoryChart>
                </MotionBox>

                {/* Parts de marché */}
                <MotionBox
                    p={6}
                    bg={cardBg}
                    borderRadius="xl"
                    boxShadow="lg"
                    whileHover={{ y: -5 }}
                >
                    <Flex align="center" mb={4}>
                        <Icon as={FaChartPie} w={8} h={8} color={iconColors[2]} mr={4} />
                        <Heading size="md">Répartition du Marché</Heading>
                    </Flex>
                    {marketShare.map((item, index) => (
                        <Box key={item.company} mb={4}>
                            <Flex justify="space-between" mb={2}>
                                <Text>{item.company}</Text>
                                <Text fontWeight="bold">{item.value}%</Text>
                            </Flex>
                            <Progress
                                value={item.value}
                                colorScheme={['teal', 'purple', 'orange', 'blue'][index % 4]}
                                borderRadius="full"
                            />
                        </Box>
                    ))}
                </MotionBox>

                {/* Évolution des prix */}
                <MotionBox
                    p={6}
                    bg={cardBg}
                    borderRadius="xl"
                    boxShadow="lg"
                    whileHover={{ y: -5 }}
                >
                    <Flex align="center" mb={4}>
                        <Icon as={FaDollarSign} w={8} h={8} color={iconColors[3]} mr={4} />
                        <Heading size="md">Dynamique des Prix</Heading>
                    </Flex>
                    <VictoryChart domainPadding={20}>
                        <VictoryBar
                            data={priceEvolution}
                            style={{ data: { fill: "#4299E1" } }}
                            animate={{ duration: 2000 }}
                        />
                    </VictoryChart>
                </MotionBox>
            </SimpleGrid>
        </Flex>
    );
};

export default VeilleConcurrentielle;