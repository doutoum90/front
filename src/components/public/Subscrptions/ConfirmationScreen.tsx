import { VStack, Heading, Text, Button } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { ConfirmationProps } from '../../../types';
import { useNavigate } from 'react-router-dom';


export const ConfirmationScreen = ({ user, plan, trialActive }: ConfirmationProps) => {
    const navigate = useNavigate();

    return (
        <VStack spacing={6} borderWidth="1px" borderRadius="lg" textAlign="center">
            <CheckCircleIcon boxSize={16} color="green.500" />
            <Heading size="lg">Félicitations, {user.name} !</Heading>
            {trialActive ? (
                <>
                    <Text>Votre essai gratuit de 14 jours pour le plan {plan.name} a démarré.</Text>
                    <Text color="gray.600">Profitez de toutes les fonctionnalités pendant cette période. Vous serez invité à souscrire à la fin de l'essai.</Text>
                </>
            ) : (
                <>
                    <Text>Votre abonnement au plan {plan.name} est actif.</Text>
                    <Text color="gray.600">Vous avez maintenant accès à toutes les fonctionnalités incluses.</Text>
                </>
            )}
            <Button colorScheme="blue" size="lg" mt={6} onClick={() => navigate('/espace-membre/dashboard')}>
                Accéder à mon espace
            </Button>
        </VStack>
    );
};