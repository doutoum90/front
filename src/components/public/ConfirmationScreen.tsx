import { VStack, Heading, Text, Button, List, ListItem, ListIcon } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { UserData, SubscriptionPlan } from '../../types';

interface ConfirmationProps {
    user: UserData;
    plan: SubscriptionPlan;
}

export const ConfirmationScreen = ({ user, plan }: ConfirmationProps) => {
    return (
        <VStack spacing={6} textAlign="center">
            <CheckCircleIcon boxSize={16} color="green.500" />
            <Heading size="xl">Abonnement confirmé !</Heading>

            <Text fontSize="xl">
                Merci {user.name} {user.lastname} pour votre abonnement {plan.name}
            </Text>

            <List spacing={3} textAlign="left">
                <ListItem>
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    Email de confirmation envoyé à {user.email}
                </ListItem>
                <ListItem>
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    Prochain prélèvement : {new Date().toLocaleDateString('fr-FR')}
                </ListItem>
                <ListItem>
                    <ListIcon as={CheckCircleIcon} color="green.500" />
                    Accès immédiat à votre tableau de bord
                </ListItem>
            </List>

            <Button
                colorScheme="blue"
                size="lg"
                mt={6}
                onClick={() => window.location.href = '/dashboard'}
            >
                Accéder à mon espace
            </Button>
        </VStack>
    );
};