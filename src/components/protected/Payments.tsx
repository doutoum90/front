import { 
    VStack, 
    Button, 
    Text, 
    Box, 
    Heading,
    Spinner,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription
} from '@chakra-ui/react';
import { usePayments } from '../../hooks/usePayment';

const STATUS_MESSAGES: Record<'active'| 'inactive', string> = {
    active: 'Abonnement actif',
    inactive: 'Aucun abonnement'
};

const LoadingState = () => (
    <Box textAlign="center" p={8}>
        <Spinner size="xl" />
        <Text mt={4}>Chargement...</Text>
    </Box>
);

const ErrorDisplay = ({ error }: { error: string }) => (
    <Alert status="error" borderRadius="md">
        <AlertIcon />
        <Box>
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Box>
    </Alert>
);

export const Payments = () => {
    const { status, isLoading, error, cancelSubscription } = usePayments();

    if (isLoading) {
        return <LoadingState />;
    }

    return (
        <VStack spacing={6} p={6} maxW="container.md" mx="auto">
            <Heading size="lg">Gestion de l'abonnement</Heading>

            {error && <ErrorDisplay error={error} />}

            <Box w="full" p={6} borderWidth="1px" borderRadius="lg">
                <VStack spacing={4}>
                    <Text fontSize="xl" fontWeight="bold">
                        Statut actuel : {STATUS_MESSAGES[status as 'active' | 'inactive'] || STATUS_MESSAGES.inactive}
                    </Text>

                    {status === 'active' ? (
                        <Button
                            colorScheme="red"
                            onClick={cancelSubscription}
                            isLoading={isLoading}
                            loadingText="Annulation en cours..."
                        >
                            Annuler l'abonnement
                        </Button>
                    ) : (
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