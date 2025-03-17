import { Box, VStack, Heading, Text, List, ListItem, ListIcon, Link } from '@chakra-ui/react';
import { AccountCreationForm } from '../AccountCreationForm';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { UserData } from '../../../types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const FreeTrialPage = () => {
    const navigate = useNavigate();
    const handleTrialSignup = async (userData: UserData) => {
        console.log('Inscription essai gratuit:', userData);
        const response = await axios.post('/api/auth/register', userData);
        if (response.status === 200) {
            navigate('/trial-confirmation');
        } else {
            console.error('Erreur lors de l\'inscription à l\'essai gratuit:', response);
        }
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