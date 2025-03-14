// pages/CompetitorsPage.tsx
import { SimpleGrid, Card, CardBody, Text, Button } from '@chakra-ui/react';
import { AddCompetitorForm } from './AddCompetitorForm';
import { useEffect, useState } from 'react';
import { Competitor } from '../../types';


export const CompetitorsPage = () => {
    const [competitors, setCompetitors] = useState<Competitor[]>([]);
    const getCompetitors = async () => {
        return await fetch('/api/veille/competitors').then(res => res.json());
    };
    useEffect(() => {
        const fetchCompetitors = async () => {
            const data = await getCompetitors();
            setCompetitors(data || []);
        };
        fetchCompetitors();
    }, []);
    const handleAdd = (competitor: Partial<Competitor>) => {
        const addCompetitor = async () => {
            await fetch('/api/veille/competitors', { method: 'POST', body: JSON.stringify(competitor) });
        };
        addCompetitor();
    };
    const onDelete = (id: string) => {
        const deleteCompetitor = async () => {
            await fetch(`/api/veille/competitors/${id}`, { method: 'DELETE' });
        };
        deleteCompetitor();
    };

    return (
        <div>
            <AddCompetitorForm onAdd={handleAdd} />

            <SimpleGrid columns={[1, 2, 3]} spacing={4} mt={4}>
                {competitors.map((competitor: Competitor) => (
                    <Card key={competitor.id}>
                        <CardBody key={competitor.id}>
                            <Text fontSize="xl">{competitor.name}</Text>
                            <Button mt={2} onClick={() => onDelete(competitor.id)}>
                                Supprimer
                            </Button>
                        </CardBody>
                    </Card>
                ))}
            </SimpleGrid>
        </div>
    );
};
export default CompetitorsPage;