import { useState, useEffect } from "react";
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
    useTheme
} from '@chakra-ui/react';
import { FiDownload } from 'react-icons/fi';

interface Report {
    id: number;
    title: string;
    author: string;
    date: string;
    download: string;
}

const Reports = () => {
    const theme = useTheme();

    const [reports, setReports] = useState<Report[]>([]);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    // Données fictives
    const REPORTS_MOCK = [
        { id: 1, title: 'Rapport Financier Q1', author: 'John Doe', date: '2024-03-15', download: '#' },
        { id: 2, title: 'Analyse Marketing', author: 'Jane Smith', date: '2024-03-18', download: '#' },
        { id: 3, title: 'Audit Technique', author: 'Bob Wilson', date: '2024-03-20', download: '#' },
    ];

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




    return (
        <Container maxW="container.xl" py={8}>
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
        </Container>
    );
};

export default Reports;