import axios from 'axios';
import {
    Box,
    Button,
    Card,
    CardBody,
    Flex,
    Grid,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    List,
    Stat,
    StatGroup,
    StatLabel,
    StatNumber,
    Tag,
    Text,
    useColorModeValue,
    useToast,
    VStack,
    Icon,
    Badge
} from '@chakra-ui/react';
import { FiSearch, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';


const MotionCard = motion(Card);

const VeilleConcurrentielle = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const cardBg = useColorModeValue('white', 'gray.700');
    const hoverEffect = { transform: 'translateY(-2px)', shadow: 'lg' };

    const mockNews = [
        {
            id: 1,
            title: 'Nouvelle levée de fonds',
            company: 'Entreprise X',
            impact: '+15% de trafic',
            category: 'Finance',
            date: '2024-03-25'
        },
        {
            id: 2,
            title: 'Lancement produit',
            company: 'Entreprise Y',
            impact: '-5% parts de marché',
            category: 'Produit',
            date: '2024-03-24'
        }
    ];

    const handleSearch = debounce((query: string) => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            toast({
                title: 'Recherche effectuée',
                description: `Résultats pour: ${query}`,
                status: 'info',
                duration: 2000
            });
        }, 1000);
    }, 500);

    const TrendIndicator = ({ value }: { value: number }) => (
        <Flex align="center" color={value >= 0 ? 'green.500' : 'red.500'}>
            <Icon as={value >= 0 ? FiTrendingUp : FiTrendingDown} mr={1} />
            <Text fontSize="sm">{value}%</Text>
        </Flex>
    );

    return (
        <Box p={8} maxW="1200px" mx="auto">
            <VStack spacing={8} align="stretch">
                {/* Section Recherche */}
                <Box>
                    <Heading size="lg" mb={4}>
                        Veille Concurrentielle
                    </Heading>
                    <InputGroup size="lg">
                        <Input
                            placeholder="Rechercher un concurrent ou un mot-clé"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                handleSearch(e.target.value);
                            }}
                            pr="4.5rem"
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={() => handleSearch(searchQuery)}>
                                <FiSearch />
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Box>

                {/* Section Analyse des tendances */}
                <Box>
                    <Heading size="md" mb={6}>
                        Analyse des tendances
                    </Heading>

                    <Grid templateColumns={['1fr', '1fr', '2fr 1fr']} gap={6}>
                        {/* Actualités */}
                        <Box>
                            <Heading size="sm" mb={4} color="gray.500">
                                Actualités des concurrents
                            </Heading>
                            <List spacing={4}>
                                {mockNews.map((news) => (
                                    <MotionCard
                                        key={news.id}
                                        bg={cardBg}
                                        whileHover={hoverEffect}
                                        cursor="pointer"
                                    >
                                        <CardBody>
                                            <Flex justify="space-between" align="start">
                                                <VStack align="start" spacing={2}>
                                                    <Badge colorScheme="blue">{news.category}</Badge>
                                                    <Heading size="sm">{news.title}</Heading>
                                                    <Text fontSize="sm" color="gray.500">
                                                        {news.company} • {new Date(news.date).toLocaleDateString()}
                                                    </Text>
                                                </VStack>
                                                <Tag colorScheme={news.impact.includes('+') ? 'green' : 'red'}>
                                                    {news.impact}
                                                </Tag>
                                            </Flex>
                                        </CardBody>
                                    </MotionCard>
                                ))}
                            </List>
                        </Box>

                        {/* Surveillance */}
                        <Box>
                            <Heading size="sm" mb={4} color="gray.500">
                                Surveillance en temps réel
                            </Heading>
                            <VStack spacing={4} align="stretch">
                                <MotionCard bg={cardBg} whileHover={hoverEffect}>
                                    <CardBody>
                                        <Text fontWeight="bold" mb={2}>
                                            Dernière activité
                                        </Text>
                                        <Flex justify="space-between">
                                            <Text>Concurrent Principal</Text>
                                            <Tag colorScheme="green">En ligne</Tag>
                                        </Flex>
                                    </CardBody>
                                </MotionCard>

                                <MotionCard bg={cardBg} whileHover={hoverEffect}>
                                    <CardBody>
                                        <Text fontWeight="bold" mb={2}>
                                            Impact marché
                                        </Text>
                                        <Flex justify="space-between" align="center">
                                            <Text>Entreprise X</Text>
                                            <TrendIndicator value={15} />
                                        </Flex>
                                        <Flex justify="space-between" align="center">
                                            <Text>Entreprise Y</Text>
                                            <TrendIndicator value={-5} />
                                        </Flex>
                                    </CardBody>
                                </MotionCard>
                            </VStack>
                        </Box>
                    </Grid>
                </Box>

                {/* Métriques */}
                <Box>
                    <StatGroup
                        p={4}
                        bg={cardBg}
                        borderRadius="md"
                        border="1px solid"
                        borderColor="gray.100"
                    >
                        <Stat>
                            <StatLabel>Trafic concurrentiel</StatLabel>
                            <StatNumber>1,500/800</StatNumber>
                            <Text fontSize="sm" color="gray.500">
                                web/html
                            </Text>
                        </Stat>

                        <Stat>
                            <StatLabel>Engagement</StatLabel>
                            <StatNumber>2,000</StatNumber>
                            <Text fontSize="sm" color="gray.500">
                                vert-demsackle.html
                            </Text>
                        </Stat>
                    </StatGroup>
                </Box>
            </VStack>
        </Box>
    );
};

export default VeilleConcurrentielle;