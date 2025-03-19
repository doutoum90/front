// src/components/Subscriptions/PlanSelection.tsx
import { SimpleGrid, Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { SubscriptionPlan } from '../../../types';

const plans: SubscriptionPlan[] = [
    { id: 'essentiel', name: 'Essentiel', price: 29, features: ['Surveillance de 3 concurrents', 'Alertes hebdomadaires', 'Rapports mensuels basiques', 'Support email'] },
    {
        id: 'pro',
        name: 'PRO',
        price: 59,
        features: ['Surveillance de 10 concurrents', 'Alertes en temps réel', 'Analyses approfondies', 'Support prioritaire', 'Tableaux de bord personnalisés'],
        recommended: true,
    },
    {
        id: 'expert',
        name: 'Expert',
        price: 99,
        features: ['Surveillance illimitée', 'Intelligence artificielle intégrée', 'Analyses prédictives', 'Accès API', 'Account manager dédié'],
    },
];
interface PlanSelectionProps {
    onSelectPlan: (plan: SubscriptionPlan, trialActive: boolean) => void;
}

export const PlanSelection = ({ onSelectPlan }: PlanSelectionProps) => {
    return (
        <VStack spacing={6}>
            <Text fontSize="lg" color="gray.600">Commencez avec un essai gratuit de 14 jours ou souscrivez immédiatement :</Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                {plans.map((plan) => (
                    <Box
                        key={plan.id}
                        borderWidth="1px"
                        borderRadius="xl"
                        p={8}
                        position="relative"
                        borderColor={plan.recommended ? 'blue.500' : 'gray.200'}
                        boxShadow={plan.recommended ? 'xl' : 'md'}
                    >
                        {plan.recommended && (
                            <Text position="absolute" top="-4" left="50%" transform="translateX(-50%)" bg="blue.500" color="white" px={4} py={1} borderRadius="full" fontSize="sm">
                                Recommandé
                            </Text>
                        )}
                        <VStack spacing={4} align="stretch">
                            <Heading size="lg">{plan.name}</Heading>
                            <Text fontSize="4xl" fontWeight="bold">
                                {plan.price}€<Text as="span" fontSize="md" color="gray.500">/mois</Text>
                            </Text>
                            <VStack spacing={3} align="start">
                                {plan.features.map((feature) => (
                                    <Text key={feature}>✓ {feature}</Text>
                                ))}
                            </VStack>
                            <Button colorScheme={plan.recommended ? 'blue' : 'gray'} size="lg" mt={6} onClick={() => onSelectPlan(plan, false)}>
                                Souscrire maintenant
                            </Button>
                            <Button variant="outline" size="lg" mt={2} onClick={() => onSelectPlan(plan, true)}>
                                Essai gratuit 14 jours
                            </Button>
                        </VStack>
                    </Box>
                ))}
            </SimpleGrid>
        </VStack>
    );
};