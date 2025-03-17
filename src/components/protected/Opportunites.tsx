import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    TableContainer,
    Container,
    Text,
    useTheme,
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
    Badge
} from '@chakra-ui/react';
import { FiCheckCircle, FiTrash2, FiInfo, FiDownload } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChartLine, FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

const MotionBox = motion(Box);

interface Opportunity {
    id: number;
    message: string;
    date: string;
    source: string;
    status: 'new' | 'in_progress' | 'resolved';
}

interface Law {
    id: number;
    message: string;
    date?: string;
}
interface Block {
    id: number;
    message: string;
    date: string;
    icon: React.ReactNode;
}

interface Report {
    id: number;
    title: string;
    author: string;
    date: string;
    download: string;
}

const API_ENDPOINT = '/api/alerts';

const OPPORTUNITES_MOCK: Opportunity[] = [
    {
        id: 1,
        message: 'Accord commercial avec l\'asie	',
        date: '2024-03-25',
        source: 'Système',
        status: 'new'
    },
    {
        id: 2,
        message: 'Nouvelle aide pour les PME',
        date: '2024-03-24',
        source: 'Sécurité',
        status: 'in_progress'
    },
    {
        id: 3,
        message: 'Augmentations des investissements étrangers',
        date: '2024-03-23',
        source: 'Infrastructure',
        status: 'resolved'
    },
];

const LOIS_MOCK: Law[] = [
    {
        id: 1,
        message: 'Nouveau décret sur la réglementation du e-commerce',
        date: '2025-03-15'
    },
    {
        id: 2,
        message: 'Subvention disponible pour les start-ups technologiques',
    },
    {
        id: 2,
        message: 'loi sur la protection des données renforcée'
    }
]

const BLOCKS_MOCK: Block[] = [
    {
        id: 1,
        message: 'Tendances des opportunités',
        icon: <FaChartLine />,
        date: '2025-03-15'
    },
    {
        id: 2,
        message: 'Evolution des risques',
        icon: <FaExclamationTriangle />,
        date: '2025-03-15'
    }
]

const REPORTS_MOCK: Report[] = [
    { id: 1, title: 'Rapport Financier Q1', author: 'John Doe', date: '2024-03-15', download: '#' },
    { id: 2, title: 'Analyse Marketing', author: 'Jane Smith', date: '2024-03-18', download: '#' },
    { id: 3, title: 'Audit Technique', author: 'Bob Wilson', date: '2024-03-20', download: '#' },
];


const Opportunites = () => {
    const theme = useTheme();
    const toast = useToast();
    const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
    const [laws, setLaws] = useState<Law[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [reports, setReports] = useState<Report[]>([]);


    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        try {
            const response = await axios.post('/api/reports/request', {
                headers: { Authorization: `Bearer ${refreshToken}` },
            });
            setReports(response.data);
        } catch (error) {
            setReports(REPORTS_MOCK);
            console.error('Erreur lors de la récupération des rapports:', error);
        }
    };


    const handleDownload = async (reportId: string) => {
        const refreshToken = localStorage.getItem('refresh_token');
        try {
            await axios.post(`/api/reports/${reportId}/download`, {
                headers: { Authorization: `Bearer ${refreshToken}` },
            });

            console.log(`Téléchargement du rapport ${reportId}`);
        } catch (error) {
            console.error('Erreur lors du téléchargement du rapport :', error);
        }
    };


    const fetchOpportunities = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            const response = await axios.get(API_ENDPOINT, {
                headers: { Authorization: `Bearer ${refreshToken}` },
            });
            setOpportunities(response.data);
        } catch (error) {
            // setError('Erreur de chargement des données');
            setOpportunities(OPPORTUNITES_MOCK);
            /* toast({
                title: 'Erreur',
                description: "Impossible de charger les opportunités",
                status: 'error',
                duration: 3000,
                isClosable: true,
            }); */
        } finally {
            setIsLoading(false);
        }
    };

    const fetchLaws = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            const response = await axios.get(API_ENDPOINT, {
                headers: { Authorization: `Bearer ${refreshToken}` },
            });
            setLaws(response.data);
        } catch (error) {
            // setError('Erreur de chargement des données');
            setLaws(LOIS_MOCK);
        }
    };

    useEffect(() => {
        fetchOpportunities();
        fetchLaws();
    }, []);

    const handleDelete = async (id: number) => {
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

    const handleResolve = (id: number) => {
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
                    <Text fontSize="xl" fontWeight="semibold" mb={4}>
                        📢 Alertes en temps réel
                    </Text>
                    <List spacing={3}>
                        {laws.map((law) => (
                            <ListItem
                                key={law.id}
                                p={4}
                                bg="white"
                                borderRadius="md"
                                boxShadow="sm"
                                display="flex"
                                alignItems="center"
                            >
                                <Box flex={1}>
                                    <Text fontWeight="medium">{law.message}</Text>
                                    {law.date && (
                                        <Text fontSize="sm" color="gray.500">
                                            {formatDate(law.date)}
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
                            bg="white"
                            borderRadius="xl"
                            boxShadow="md"
                            flex={1}
                            whileHover={{ y: -5 }}
                        >
                            <Stat>

                                <StatLabel fontSize="md"> {block.icon} {block.message}</StatLabel>
                                <StatHelpText color="green.500">

                                    +15% ce mois-ci
                                </StatHelpText>
                            </Stat>
                        </MotionBox>
                    ))}
                </Stack>

                {/* Tableau des opportunités */}
                <Box>
                    <Text fontSize="xl" fontWeight="semibold" mb={4}>
                        🚀 Nouvelles opportunités
                    </Text>
                    <TableContainer
                        borderWidth="1px"
                        borderRadius="lg"
                        overflowX="auto"
                        bg="white"
                        boxShadow="sm"
                    >
                        <Table variant="striped" colorScheme="blue">
                            <Thead bg={theme.colors.blue[600]}>
                                <Tr>
                                    <Th color="white">Statut</Th>
                                    <Th color="white">Opportunité</Th>
                                    <Th color="white">Date</Th>
                                    <Th color="white">Source</Th>
                                    <Th color="white" textAlign="center">Actions</Th>
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
                                            <Td fontWeight="medium">{opportunity.message}</Td>
                                            <Td>{formatDate(opportunity.date)}</Td>
                                            <Td>{opportunity.source}</Td>
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

                    <Text fontSize="2xl" mb={6} fontWeight="bold" bgGradient="linear(to-l, teal.500, blue.500)"
                        bgClip="text">
                        Rapports Disponibles
                    </Text>

                    <TableContainer
                        borderWidth="1px"
                        borderRadius="lg"
                        overflowX="auto"
                        boxShadow="md"
                    >
                        <Table variant="simple" colorScheme="teal">
                            <Thead bg={theme.colors.teal[500]}>
                                <Tr>
                                    <Th color="white">Titre</Th>
                                    <Th color="white">Auteur</Th>
                                    <Th color="white">Date</Th>
                                    <Th color="white" textAlign="center">Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {reports.map((report) => (
                                    <Tr key={report.id} _hover={{ bg: 'gray.50' }}>
                                        <Td fontWeight="medium">{report.title}</Td>
                                        <Td>{report.author}</Td>
                                        <Td>{report.date}</Td>
                                        <Td textAlign="center">
                                            <Button
                                                colorScheme="teal"
                                                variant="outline"
                                                leftIcon={<FiDownload />}
                                                onClick={() => handleDownload(report.id.toString())}
                                                size="sm"
                                            >
                                                Télécharger
                                            </Button>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Stack>
        </Container>
    );
};

export default Opportunites;