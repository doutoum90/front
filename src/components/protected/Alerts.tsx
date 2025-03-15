/* import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export const Alerts = () => {
    

    return (
        <div>
            <h1>Alerts</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {alerts.map((alert: any) => (
                        <tr key={alert.id}>
                            <td>{alert.name}</td>
                            <td>
                                <Button onClick={() => removeAlert(alert.id)}>Supprimer</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                    </tr>
                </thead>
                <tbody>


                    {regulations.map((regulation: any) => (
                        <tr key={regulation.id}>
                            <td>{regulation.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Button onClick={addAlert}>Ajouter une alerte</Button>
        </div>
    );
};

export default Alerts; */

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
    Box,
    Flex,
    Select,
    Input
} from '@chakra-ui/react';
import { FiBell, FiCheckCircle, FiTrash2 } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Alert {
    id: number;
    message: string;
    status: string;
    priority: string;
    date: string;
    source: string;
}


const Alerts = () => {
    const ALERTES_MOCK = [
        {
            id: 1,
            message: 'Détection anomalie réseau',
            status: 'Non lue',
            priority: 'Critique',
            date: '2024-03-25',
            source: 'Système'
        },
        {
            id: 2,
            message: 'Mise à jour sécurité requise',
            status: 'En cours',
            priority: 'Haute',
            date: '2024-03-24',
            source: 'Sécurité'
        },
        {
            id: 3,
            message: 'Panne serveur DC-01',
            status: 'Résolue',
            priority: 'Urgente',
            date: '2024-03-23',
            source: 'Infrastructure'
        },
    ];

    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [newAlertMessage, setNewAlertMessage] = useState('');
    const [newAlertPriority, setNewAlertPriority] = useState('');

    useEffect(() => {
        fetchAlerts();
    }, []);

    const addAlert = async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        try {
            await axios.post('/api/alerts/subscribe', {
                headers: { Authorization: `Bearer ${refreshToken}` },
            });
            fetchAlerts();
        } catch (error) {
            console.error('Erreur lors de l\'ajout d\'une alerte :', error);
        }
    };

    const handleDelete = async (id: string) => {
        const refreshToken = localStorage.getItem('refresh_token');
        try {
            await axios.delete(`/api/alerts/unsubscribe/${id}`, {
                headers: { Authorization: `Bearer ${refreshToken}` },
            });
            fetchAlerts();
        } catch (error) {
            console.error('Erreur lors de la suppression d\'une alerte :', error);
        }
    };


    const fetchAlerts = async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        try {
            const response = await axios.get('/api/alerts', {
                headers: { Authorization: `Bearer ${refreshToken}` },
            });
            setAlerts(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des alertes:', error);
            setAlerts(ALERTES_MOCK);
        }
    };
    const theme = useTheme();

    // Données fictives d'alertes


    const handleResolve = (alertId: string) => {
        // Logique de résolution d'alerte
        console.log(`Résolution alerte ${alertId}`);
    };


    return (
        <Container maxW="container.xl" py={8}>
            <Text
                fontSize="2xl"
                mb={6}
                fontWeight="bold"
                bgGradient="linear(to-r, red.500, orange.500)"
                bgClip="text"
                display="flex"
                alignItems="center"
                gap={2}
            >
                <FiBell /> Gestion des Alertes
            </Text>

            <Flex justifyContent="flex-start" mb={4}>

                <Flex direction="column" mt={4}>
                    <Text fontWeight="bold" mb={2}>Ajouter une nouvelle alerte</Text>
                    <Input placeholder="Message de l'alerte" value={newAlertMessage} onChange={(e) => setNewAlertMessage(e.target.value)} mb={2} />
                    <Select placeholder="Sélectionner la priorité" value={newAlertPriority} onChange={(e) => setNewAlertPriority(e.target.value)} mb={2}>
                        <option value="Critique">Critique</option>
                        <option value="Haute">Haute</option>
                        <option value="Moyenne">Moyenne</option>
                        <option value="Basse">Basse</option>
                    </Select>
                    <Button colorScheme="teal" onClick={addAlert}>Ajouter une alerte</Button>
                </Flex>
            </Flex>

            <TableContainer
                borderWidth="1px"
                borderRadius="lg"
                overflowX="auto"
                boxShadow="md"
            >
                <Table variant="striped" colorScheme="orange">
                    <Thead bg={theme.colors.orange[500]}>
                        <Tr>
                            <Th color="white">Message</Th>
                            <Th color="white">Statut</Th>
                            <Th color="white">Priorité</Th>
                            <Th color="white">Date</Th>
                            <Th color="white">Source</Th>
                            <Th color="white" textAlign="center">Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {alerts.map((alert) => (
                            <Tr key={alert.id} _hover={{ bg: 'gray.50' }}>
                                <Td fontWeight="medium">{alert.message}</Td>
                                <Td>
                                    <Badge
                                        colorScheme={
                                            alert.status === 'Résolue' ? 'green' :
                                                alert.status === 'En cours' ? 'yellow' : 'red'
                                        }
                                        p={1.5}
                                        borderRadius="md"
                                    >
                                        {alert.status}
                                    </Badge>
                                </Td>
                                <Td>
                                    <Box
                                        color={
                                            alert.priority === 'Critique' ? 'red.600' :
                                                alert.priority === 'Urgente' ? 'orange.600' : 'yellow.600'
                                        }
                                        fontWeight="bold"
                                    >
                                        {alert.priority}
                                    </Box>
                                </Td>
                                <Td>{alert.date}</Td>
                                <Td>{alert.source}</Td>
                                <Td textAlign="center">
                                    <Button
                                        colorScheme="green"
                                        variant="ghost"
                                        onClick={() => handleResolve(alert.id.toString())}
                                        size="sm"
                                        mr={2}
                                        leftIcon={<FiCheckCircle />}
                                    >
                                        Résoudre
                                    </Button>
                                    <Button
                                        colorScheme="red"
                                        variant="ghost"
                                        onClick={() => handleDelete(alert.id.toString())}
                                        size="sm"
                                        leftIcon={<FiTrash2 />}
                                    >
                                        Supprimer
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

export default Alerts;