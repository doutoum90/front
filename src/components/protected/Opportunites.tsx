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
    IconButton,
    Badge,
    useColorModeValue,
    Alert,
    AlertIcon,
    Heading
} from '@chakra-ui/react';
import { FiCheckCircle, FiTrash2 } from 'react-icons/fi';
import { FaChartLine, FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useOpportunities } from '../../hooks/useOpportunities';
import { Block, Opportunity } from '../../types';

const MotionBox = motion(Box);

const BLOCKS_MOCK: Block[] = [
    {
        id: 'zezeezhzejheriurerere',
        message: 'Tendances des opportunités',
        icon: <FaChartLine />,
        date: '2025-03-15',
    },
    {
        id: 'reireuizezeezhzejerheerrriuere',
        message: 'Evolution des risques',
        icon: <FaExclamationTriangle />,
        date: '2025-03-15',
    },
];
export const StatusBadge = ({ status }: { status: Opportunity['status'] }) => {
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

const Opportunites = () => {
    const { opportunities, regulations, handleDelete, handleResolve, loading, error } = useOpportunities();
    const bgColor = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.800', 'white');
    const mutedTextColor = useColorModeValue('gray.500', 'gray.400');
    const tableHeaderBg = useColorModeValue('blue.600', 'blue.200');
    const tableHeaderColor = useColorModeValue('white', 'gray.800');
    const statBg = useColorModeValue('white', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const positiveColor = useColorModeValue('green.500', 'green.200');

    const formatDate = (dateString: string) => {
        return format(parseISO(dateString), 'd MMMM yyyy', { locale: fr });
    };

    if (error) {
        return (
            <Alert status="error" variant="subtle" flexDirection="column" alignItems="center">
                <AlertIcon boxSize="40px" mr={0} />
                <Heading mt={4} mb={1} fontSize="lg">{error}</Heading>
            </Alert>
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
                                        📌 {regulation.message}
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
                <Stack direction={{ base: 'column', md: 'row' }} spacing={12}>
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
                                <StatHelpText color={positiveColor}>
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
                                {loading ? (
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