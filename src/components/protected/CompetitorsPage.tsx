import {
    SimpleGrid,
    Card,
    CardBody,
    Text,
    Button,
    Box,
    Skeleton,
    useToast
} from '@chakra-ui/react';
import { AddCompetitorForm } from './commons/AddCompetitorForm';
import { Competitor } from '../../types';
import { useCompetitors } from '../../hooks/useCompetitors';


export const CompetitorsPage = () => {
    const toast = useToast();
    const {
        competitors,
        loading,
        error,
        addCompetitor,
        deleteCompetitor
    } = useCompetitors();

    const handleAdd = async (competitor: Partial<Competitor>) => {
        try {
            await addCompetitor(competitor);
            toast({
                title: 'Concurrent ajouté',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Erreur',
                description: 'Échec de l\'ajout du concurrent',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteCompetitor(id);
            toast({
                title: 'Concurrent supprimé',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Erreur',
                description: 'Échec de la suppression du concurrent',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    if (error) {
        return (
            <Box textAlign="center" py={10}>
                <Text color="red.500">{error}</Text>
            </Box>
        );
    }

    return (
        <Box p={4}>
            <AddCompetitorForm onAdd={handleAdd} />

            {loading ? (
                <SimpleGrid columns={[1, 2, 3]} spacing={4} mt={4}>
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} height="100px" borderRadius="md" />
                    ))}
                </SimpleGrid>
            ) : (
                <SimpleGrid columns={[1, 2, 3]} spacing={4} mt={4}>
                    {competitors.map((competitor: Competitor) => (
                        <Card key={competitor.id} variant="outline">
                            <CardBody>
                                <Text fontSize="xl" mb={2}>
                                    {competitor.name}
                                </Text>
                                <Button
                                    colorScheme="red"
                                    variant="outline"
                                    onClick={() => handleDelete(competitor.id)}
                                    isLoading={loading}
                                >
                                    Supprimer
                                </Button>
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>
            )}
        </Box>
    );
};
export default CompetitorsPage;