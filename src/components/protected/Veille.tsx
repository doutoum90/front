import { useEffect, useState } from 'react';
import { Button, Input, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';

const Veille = () => {
    const [competitors, setCompetitors] = useState([]);
    const [newCompetitor, setNewCompetitor] = useState('');

    useEffect(() => {
        fetchCompetitors();
    }, []);

    const fetchCompetitors = async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        try {
            const response = await axios.get('/api/veille/competitors', {
                headers: { Authorization: `Bearer ${refreshToken}` },
            });
            setCompetitors(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des concurrents :', error);
        }
    };

    const addCompetitor = async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        try {
            await axios.post(
                '/api/veille/competitors/add',
                { competitor: newCompetitor },
                { headers: { Authorization: `Bearer ${refreshToken}` } }
            );
            fetchCompetitors();
        } catch (error) {
            console.error('Erreur lors de l\'ajout d\'un concurrent :', error);
        }
    };

    return (
        <VStack spacing={4}>
            <Input
                placeholder="Nouveau concurrent"
                value={newCompetitor}
                onChange={(e) => setNewCompetitor(e.target.value)}
            />
            <Button onClick={addCompetitor} colorScheme="teal">Ajouter</Button>
            {competitors.map((comp, index) => (
                <Text key={index}>{comp}</Text>
            ))}
        </VStack>
    );
};

export default Veille;