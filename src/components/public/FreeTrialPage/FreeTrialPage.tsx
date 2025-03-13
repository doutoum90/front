import { Box, VStack, Heading, Text, Button, List, ListItem, ListIcon, Link } from '@chakra-ui/react';
import { AccountCreationForm } from '../AccountCreationForm';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { UserData } from '../../../types';
import { useNavigate } from 'react-router-dom';

export const FreeTrialPage = () => {
    const navigate = useNavigate();
    const handleTrialSignup = (userData: UserData) => {
        // Logique d'inscription à l'essai gratuit
        console.log('Inscription essai gratuit:', userData);
        // Redirection après succès
        navigate('/trial-confirmation');
    };

    return (
        <Box maxW="2xl" mx="auto" py={10}>
            <VStack spacing={8} textAlign="center" mb={10}>
                <Heading size="2xl" color="blue.600">
                    Essayez notre service gratuitement pendant 14 jours
                </Heading>

                <Text fontSize="xl">
                    Découvrez toutes les fonctionnalités PRO sans engagement
                </Text>

                <List spacing={3} textAlign="left">
                    <ListItem>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        Accès complet à toutes les fonctionnalités
                    </ListItem>
                    <ListItem>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        Support prioritaire inclus
                    </ListItem>
                    <ListItem>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        Aucune carte de crédit requise
                    </ListItem>
                </List>
            </VStack>

            <Box bg="white" p={8} borderRadius="xl" boxShadow="lg">
                <AccountCreationForm
                    onSuccess={handleTrialSignup}
                    showPasswordPolicy={true}
                    ctaText="Commencer l'essai gratuit"
                />

                <Text mt={4} textAlign="center" color="gray.600">
                    En cliquant, vous acceptez nos
                    <Link href="/terms" color="blue.600" mx={1}>conditions d'utilisation</Link>
                    et notre
                    <Link href="/privacy" color="blue.600" mx={1}>politique de confidentialité</Link>
                </Text>
            </Box>
        </Box>
    );
};

export default FreeTrialPage;