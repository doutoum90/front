import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Container,
    Text,
    Box,
    Stack,
    List,
    ListItem,
    Stat,
    StatHelpText,
    StatLabel,
    Skeleton,
    useToast,
    IconButton,
    Badge,
    useColorModeValue
} from '@chakra-ui/react';
import { FiCheckCircle, FiTrash2, FiInfo } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChartLine, FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Opportunity, RegulationShort, Block } from '../../types';

const MotionBox = motion(Box);


const API_ENDPOINT = '/api/alerts';

const OPPORTUNITES_MOCK: Opportunity[] = [
    {
        id: 'zehzejhe',
        message: 'Accord commercial avec l\'asie	',
        date: '2024-03-25',
        source: 'Système',
        status: 'new'
    },
    {
        id: 'zehzejheerriuere',
        message: 'Nouvelle aide pour les PME',
        date: '2024-03-24',
        source: 'Sécurité',
        status: 'in_progress'
    },
    {
        id: 'zehzejheriuere',
        message: 'Augmentations des investissements étrangers',
        date: '2024-03-23',
        source: 'Infrastructure',
        status: 'resolved'
    },
];

const REGULATIONS_MOCK: RegulationShort[] = [
    {
        id: 'zezeezhzejheriuere',
        message: 'Nouveau décret sur la réglementation du e-commerce',
        date: '2025-03-15'
    },
    {
        id: 'reireuizezeezhzejheriuere',
        message: 'Subvention disponible pour les start-ups technologiques',
    },
    {
        id: 'reireuizezeezhzejerheriuere',
        message: 'loi sur la protection des données renforcée'
    }
]

const BLOCKS_MOCK: Block[] = [
    {
        id: 'zezeezhzejheriurerere',
        message: 'Tendances des opportunités',
        icon: <FaChartLine />,
        date: '2025-03-15'
    },
    {
        id: 'reireuizezeezhzejerheerrriuere',
        message: 'Evolution des risques',
        icon: <FaExclamationTriangle />,
        date: '2025-03-15'
    }
]




const Opportunites = () => {
    const toast = useToast();
    const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
    const [regulations, setRegulations] = useState<RegulationShort[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const bgColor = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.800', 'white');
    const mutedTextColor = useColorModeValue('gray.500', 'gray.400');
    const tableHeaderBg = useColorModeValue('blue.600', 'blue.200');
    const tableHeaderColor = useColorModeValue('white', 'gray.800');
    const statBg = useColorModeValue('white', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    const fetchOpportunities = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            const response = await axios.get(API_ENDPOINT, {
                headers: { Authorization: `Bearer ${refreshToken}` },
            });
            setOpportunities(response.data.length > 0 ? response.data : OPPORTUNITES_MOCK);
        } catch (error) {
            setError('Erreur de chargement des données');
            toast({
                title: 'Erreur',
                description: "Impossible de charger les opportunités",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const fetchRegulations = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            const response = await axios.get(API_ENDPOINT, {
                headers: { Authorization: `Bearer ${refreshToken}` },
            });
            setRegulations(response.data.length > 0 ? response.data : REGULATIONS_MOCK);
        } catch (error) {
            setError('Erreur de chargement des données');
        }
    };

    useEffect(() => {
        fetchOpportunities();
        fetchRegulations();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            await axios.delete(`${API_ENDPOINT}/${id}`, {
                headers: { Authorization: `Bearer ${refreshToken}` },
            });
            toast({
                title: 'Supprimé',
                description: "L'opportunité a été supprimée",
                status: 'success',
                duration: 2000,
            });
            await fetchOpportunities();
        } catch (error) {
            toast({
                title: 'Erreur',
                description: 'Échec de la suppression',
                status: 'error',
                duration: 3000,
            });
        }
    };

    const handleResolve = (id: string) => {
        setOpportunities(prev =>
            prev.map(opp =>
                opp.id === id ? { ...opp, status: 'resolved' } : opp
            )
        );
    };

    const formatDate = (dateString: string) => {
        return format(parseISO(dateString), 'd MMMM yyyy', { locale: fr });
    };

    const StatusBadge = ({ status }: { status: Opportunity['status'] }) => {
        const statusColors = {
            new: 'blue',
            in_progress: 'orange',
            resolved: 'green',
        };

        return (
            <Badge colorScheme={statusColors[status]} fontSize="xs">
                {status.replace('_', ' ')}
            </Badge>
        );
    };

    if (error) {
        return (
            <Box textAlign="center" py={10}>
                <FiInfo size={40} />
                <Text mt={4}>{error}</Text>
            </Box>
        );
    }

    return (
        <Container maxW="container.xl" py={8}>
            <Stack spacing={8}>
                {/* Section Alertes */}
                <Box>
                    <Text fontSize="xl" fontWeight="semibold" mb={4} color={textColor}>
                        📢 Alertes en temps réel
                    </Text>
                    <List spacing={3}>
                        {regulations.map((regulation) => (
                            <ListItem
                                key={regulation.id}
                                p={4}
                                bg={bgColor}
                                borderRadius="md"
                                boxShadow="sm"
                                display="flex"
                                alignItems="center"
                                borderWidth="1px"
                                borderColor={borderColor}
                            >
                                <Box flex={1}>
                                    <Text fontWeight="medium" color={textColor}>
                                        📌{regulation.message}
                                    </Text>
                                    {regulation.date && (
                                        <Text fontSize="sm" color={mutedTextColor}>
                                            {formatDate(regulation.date)}
                                        </Text>
                                    )}
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </Box>

                {/* Section Statistiques */}
                <Stack direction={['column', 'row']} spacing={12}>
                    {BLOCKS_MOCK.map((block) => (
                        <MotionBox
                            key={block.id}
                            p={6}
                            bg={statBg}
                            borderRadius="xl"
                            boxShadow="md"
                            flex={1}
                            whileHover={{ y: -5 }}
                            borderWidth="1px"
                            borderColor={borderColor}
                        >
                            <Stat>
                                <StatLabel fontSize="md" color={textColor}>
                                    {block.icon} {block.message}
                                </StatLabel>
                                <StatHelpText color={useColorModeValue('green.500', 'green.200')}>
                                    +15% ce mois-ci
                                </StatHelpText>
                            </Stat>
                        </MotionBox>
                    ))}
                </Stack>

                {/* Tableau des opportunités */}
                <Box>
                    <Text fontSize="xl" fontWeight="semibold" mb={4} color={textColor}>
                        🚀 Nouvelles opportunités
                    </Text>
                    <TableContainer
                        borderWidth="1px"
                        borderRadius="lg"
                        overflowX="auto"
                        bg={bgColor}
                        boxShadow="sm"
                        borderColor={borderColor}
                    >
                        <Table variant="striped" colorScheme={useColorModeValue('blue', 'gray')}>
                            <Thead bg={tableHeaderBg}>
                                <Tr>
                                    <Th color={tableHeaderColor}>Statut</Th>
                                    <Th color={tableHeaderColor}>Opportunité</Th>
                                    <Th color={tableHeaderColor}>Date</Th>
                                    <Th color={tableHeaderColor}>Source</Th>
                                    <Th color={tableHeaderColor} textAlign="center">Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {isLoading ? (
                                    <Tr>
                                        <Td colSpan={5}>
                                            <Skeleton height={20} />
                                        </Td>
                                    </Tr>
                                ) : (
                                    opportunities.map((opportunity) => (
                                        <Tr key={opportunity.id}>
                                            <Td>
                                                <StatusBadge status={opportunity.status} />
                                            </Td>
                                            <Td fontWeight="medium" color={textColor}>{opportunity.message}</Td>
                                            <Td color={textColor}>{formatDate(opportunity.date)}</Td>
                                            <Td color={textColor}>{opportunity.source}</Td>
                                            <Td textAlign="center">
                                                <IconButton
                                                    aria-label="Résoudre"
                                                    icon={<FiCheckCircle />}
                                                    colorScheme="green"
                                                    variant="ghost"
                                                    onClick={() => handleResolve(opportunity.id)}
                                                    mr={2}
                                                />
                                                <IconButton
                                                    aria-label="Supprimer"
                                                    icon={<FiTrash2 />}
                                                    colorScheme="red"
                                                    variant="ghost"
                                                    onClick={() => handleDelete(opportunity.id)}
                                                />
                                            </Td>
                                        </Tr>
                                    ))
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Stack>
        </Container>
    );
};

export default Opportunites;