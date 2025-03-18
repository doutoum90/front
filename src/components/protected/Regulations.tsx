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
    Box,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Badge,
    Tag,
    TagLabel
} from '@chakra-ui/react';
import { FiDownload, FiFileText, FiEdit, FiCalendar } from 'react-icons/fi';
import { GiWeightScale } from 'react-icons/gi';
import { Regulation, Report } from '../../types';


export const Regulations = () => {
    const theme = useTheme();

    const [regulations, setRegulations] = useState<Regulation[]>([]);
    const [report, setReport] = useState<Report>({
        name: '',
        description: '',
        date: new Date().toISOString(),
        status: 'new',
        type: '',
        url: '',
        image: '',
        pdf: ''
    });
    const [reports, setReports] = useState<Report[]>([]);

    useEffect(() => {
        fetchRegulations();
        fetchReports();
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

    const fetchReports = async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        try {
            const response = await axios.get('/api/reports', {
                headers: { Authorization: `Bearer ${refreshToken}` },
            });
            setReports(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des réglementations:', error);
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

    const getPersonifiedReport = async (createReportDto: any) => {
        const refreshToken = localStorage.getItem('refresh_token');
        try {
            const response = await axios.post('/api/reports/request', createReportDto, {
                headers: { Authorization: `Bearer ${refreshToken}` },
            });
            setReport(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des rapports:', error);
        }
    };

    const handleViewDetails = (regulationTitle: string) => {
        console.log(`Voir détails régulation ${regulationTitle}`);
    };

    const handleEdit = (regulationTitle: string) => {
        console.log(`Éditer régulation ${regulationTitle}`);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'green';
            case 'En révision': return 'yellow';
            case 'Expirée': return 'red';
            default: return 'gray';
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        getPersonifiedReport(report);
    };

    return (
        <Container maxW="container.xl" py={8}>

            <Box mb={6} p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
                <Text fontSize="xl" fontWeight="bold" mb={4}>Demande de Rapport Personnalisé</Text>
                <form onSubmit={handleSubmit}>
                    <FormControl id="reportName" isRequired>
                        <FormLabel>Nom du Rapport</FormLabel>
                        <Input type="text" value={report.name} onChange={(e) => setReport({ ...report, name: e.target.value })} />
                    </FormControl>
                    <FormControl id="reportDescription" isRequired mt={4}>
                        <FormLabel>Description</FormLabel>
                        <Textarea value={report.description} onChange={(e) => setReport({ ...report, description: e.target.value })} />
                    </FormControl>

                    <FormControl id="reportPdf" isRequired mt={4}>
                        <FormLabel>PDF</FormLabel>
                        <Input type="text" value={report.pdf} onChange={(e) => setReport({ ...report, pdf: e.target.value })} />
                    </FormControl>


                    <Button mt={4} colorScheme="purple" type="submit">Soumettre la Demande</Button>
                </form>
            </Box>


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
                            <Tr key={regulation.title} _hover={{ bg: 'gray.50' }}>
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
                                        onClick={() => handleViewDetails(regulation.title)}
                                        size="sm"
                                        mr={2}
                                        leftIcon={<FiFileText />}
                                    >
                                        Détails
                                    </Button>
                                    <Button
                                        colorScheme="purple"
                                        variant="ghost"
                                        onClick={() => handleEdit(regulation.title)}
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
                            <Th color="white">Statut</Th>
                            <Th color="white" textAlign="center">Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {reports.map((report) => (
                            <Tr key={report.name} _hover={{ bg: 'gray.50' }}>
                                <Td fontWeight="medium">{report.name}</Td>
                                <Td>{report.description}</Td>
                                <Td>{report.date}</Td>
                                <Td>{report.status}</Td>
                                <Td textAlign="center">
                                    <Button
                                        colorScheme="teal"
                                        variant="outline"
                                        leftIcon={<FiDownload />}
                                        onClick={() => handleDownload(report.name)}
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
        </Container>
    );
};

export default Regulations;
