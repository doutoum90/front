import { VStack, Heading, Text, Button, Link } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

export const TrialConfirmation = () => {
    return (
        <VStack spacing={8} textAlign="center" py={20} maxW="2xl" mx="auto">
            <CheckCircleIcon boxSize={20} color="green.500" />

            <Heading size="xl">Votre essai gratuit est activé !</Heading>

            <Text fontSize="xl">
                Profitez de toutes les fonctionnalités PRO jusqu'au 30 septembre 2024
            </Text>

            <VStack spacing={4} mt={10}>
                <Button
                    colorScheme="blue"
                    size="lg"
                    as={Link}
                    href="/ecran-board"
                >
                    Accéder à mon tableau de bord
                </Button>

                <Text mt={4} color="gray.600">
                    Vous recevrez un rappel 3 jours avant la fin de votre essai.<br />
                    Aucun paiement ne sera effectué sans votre confirmation.
                </Text>
            </VStack>
        </VStack>
    );
};

export default TrialConfirmation;