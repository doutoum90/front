import { useState, useEffect } from 'react';
import { 
    VStack, 
    Button, 
    Text, 
    useToast, 
    Box, 
    Heading,
    Spinner,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription
} from '@chakra-ui/react';
import axios from 'axios';

export const Payments = () => {
    const [status, setStatus] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const toast = useToast();

    useEffect(() => {
        checkStatus();
    }, []);

    const checkStatus = async () => {
        setLoading(true);
        setError(null);
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            const response = await axios.get('/api/payments/status', {
                headers: { Authorization: `Bearer ${refreshToken}` }
            });
            setStatus(response.data.status);
        } catch (error) {
            setError('Erreur lors de la vérification du statut');
            console.error('Erreur lors de la vérification du statut :', error);
        } finally {
            setLoading(false);
        }
    };

    const cancel = async () => {
        setLoading(true);
        setError(null);
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            await axios.post('/api/payments/cancel', {}, {
                headers: { Authorization: `Bearer ${refreshToken}` }
            });
            toast({
                title: 'Abonnement annulé',
                description: 'Votre abonnement a été annulé avec succès',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            await checkStatus();
        } catch (error) {
            setError('Erreur lors de l\'annulation de l\'abonnement');
            console.error('Erreur lors de l\'annulation :', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box textAlign="center" p={8}>
                <Spinner size="xl" />
                <Text mt={4}>Chargement...</Text>
            </Box>
        );
    }

    return (
        <VStack spacing={6} p={6} maxW="container.md" mx="auto">
            <Heading size="lg">Gestion de l'abonnement</Heading>

            {error && (
                <Alert status="error" borderRadius="md">
                    <AlertIcon />
                    <Box>
                        <AlertTitle>Erreur</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Box>
                </Alert>
            )}

            <Box w="full" p={6} borderWidth="1px" borderRadius="lg">
                <VStack spacing={4}>
                    <Text fontSize="xl" fontWeight="bold">
                        Statut actuel : {status === 'active' ? 'Abonnement actif' : 'Aucun abonnement'}
                    </Text>

                    {status === 'active' && (
                        <Button
                            colorScheme="red"
                            onClick={cancel}
                            isLoading={loading}
                            loadingText="Annulation en cours..."
                        >
                            Annuler l'abonnement
                        </Button>
                    )}

                    {status !== 'active' && (
                        <Button
                            colorScheme="blue"
                            onClick={() => window.location.href = '/subscription'}
                        >
                            Choisir un abonnement
                        </Button>
                    )}
                </VStack>
            </Box>
        </VStack>
    );
};

export default Payments;