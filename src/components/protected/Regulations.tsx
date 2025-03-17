import { useEffect, useState } from "react";
import axios from "axios";
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
    Badge,
    Tag,
    TagLabel
} from '@chakra-ui/react';
import { FiFileText, FiEdit, FiCalendar } from 'react-icons/fi';
import { GiWeightScale } from 'react-icons/gi';
interface Regulation {
    id: number;
    title: string;
    category: string;
    status: string;
    department: string;
    effectiveDate: string;
    lastUpdate: string;
}

export const Regulations = () => {
    const theme = useTheme();

    const [regulations, setRegulations] = useState<Regulation[]>([]);
    useEffect(() => {
        fetchRegulations();
    }, []);
    const fetchRegulations = async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        try {
            const response = await axios.get('/api/regulations', {
                headers: { Authorization: `Bearer ${refreshToken}` },
            });
            setRegulations(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des réglementations:', error);
        }

    };


    const handleViewDetails = (regulationId: number) => {
        console.log(`Voir détails régulation ${regulationId}`);
    };

    const handleEdit = (regulationId: number) => {
        console.log(`Éditer régulation ${regulationId}`);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'green';
            case 'En révision': return 'yellow';
            case 'Expirée': return 'red';
            default: return 'gray';
        }
    };

    return (
        <Container maxW="container.xl" py={8}>
            <Text
                fontSize="2xl"
                mb={6}
                fontWeight="bold"
                bgGradient="linear(to-r, purple.500, blue.500)"
                bgClip="text"
                display="flex"
                alignItems="center"
                gap={2}
            >
                <GiWeightScale /> Gestion des Régulations
            </Text>

            <TableContainer
                borderWidth="1px"
                borderRadius="lg"
                overflowX="auto"
                boxShadow="md"
            >
                <Table variant="striped" colorScheme="purple">
                    <Thead bg={theme.colors.purple[500]}>
                        <Tr>
                            <Th color="white">Titre</Th>
                            <Th color="white">Catégorie</Th>
                            <Th color="white">Statut</Th>
                            <Th color="white">Département</Th>
                            <Th color="white">Date d'effet</Th>
                            <Th color="white" textAlign="center">Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {regulations.map((regulation) => (
                            <Tr key={regulation.id} _hover={{ bg: 'gray.50' }}>
                                <Td fontWeight="medium">
                                    <Tag variant="subtle" colorScheme="blue" mr={2}>
                                        <FiFileText />
                                    </Tag>
                                    {regulation.title}
                                </Td>
                                <Td>
                                    <Tag colorScheme="cyan" borderRadius="full">
                                        <TagLabel>{regulation.category}</TagLabel>
                                    </Tag>
                                </Td>
                                <Td>
                                    <Badge
                                        colorScheme={getStatusColor(regulation.status)}
                                        px={3}
                                        py={1}
                                        borderRadius="full"
                                        textTransform="capitalize"
                                    >
                                        {regulation.status}
                                    </Badge>
                                </Td>
                                <Td>{regulation.department}</Td>
                                <Td>
                                    <Tag colorScheme="gray">
                                        <FiCalendar style={{ marginRight: '6px' }} />
                                        {regulation.effectiveDate}
                                    </Tag>
                                </Td>
                                <Td textAlign="center">
                                    <Button
                                        colorScheme="blue"
                                        variant="outline"
                                        onClick={() => handleViewDetails(regulation.id)}
                                        size="sm"
                                        mr={2}
                                        leftIcon={<FiFileText />}
                                    >
                                        Détails
                                    </Button>
                                    <Button
                                        colorScheme="purple"
                                        variant="ghost"
                                        onClick={() => handleEdit(regulation.id)}
                                        size="sm"
                                        leftIcon={<FiEdit />}
                                    >
                                        Modifier
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Regulations;
