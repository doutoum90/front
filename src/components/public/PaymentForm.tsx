import { useState } from 'react';
import {
    VStack,
    FormControl,
    FormLabel,
    Button,
    Alert,
    AlertIcon,
    useToast,
    Grid,
    GridItem,
    Box,
    Text
} from '@chakra-ui/react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { UserData, SubscriptionPlan } from '../../types';

interface PaymentFormProps {
    user: UserData;
    plan: SubscriptionPlan;
    onSuccess: () => void;
}

export const PaymentForm = ({ user, plan, onSuccess }: PaymentFormProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const toast = useToast();
    const [error, setError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);
        setError('');

        const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)!,
            billing_details: {
                name: `${user.name} ${user.lastname}`,
                email: user.email
            }
        });

        if (stripeError) {
            setError(stripeError.message || 'Erreur de paiement');
            setIsProcessing(false);
            return;
        }

        try {
            // Appel à votre backend pour confirmer le paiement
            const response = await fetch('/api/payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    paymentMethodId: paymentMethod.id,
                    planId: plan.id,
                    amount: plan.price * 100 // Conversion en cents
                })
            });

            if (!response.ok) throw new Error('Échec du paiement');

            toast({
                title: 'Paiement réussi',
                description: `Abonnement ${plan.name} activé`,
                status: 'success',
                duration: 5000
            });

            onSuccess();
        } catch (err) {
            setError('Erreur lors du traitement du paiement');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Box maxW="md" mx="auto">
            <VStack spacing={6} as="form" onSubmit={handleSubmit}>
                <Text fontSize="2xl" fontWeight="bold">
                    Total à payer : {plan.price}€ / mois
                </Text>

                {error && (
                    <Alert status="error" borderRadius="md">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}

                <FormControl>
                    <FormLabel>Informations de carte</FormLabel>
                    <Box
                        borderWidth="1px"
                        borderRadius="md"
                        p={4}
                        _focusWithin={{ boxShadow: 'outline' }}
                    >
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': { color: '#aab7c4' }
                                    },
                                    invalid: { color: '#9e2146' }
                                }
                            }}
                        />
                    </Box>
                </FormControl>

                <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                    <GridItem>
                        <Button
                            w="full"
                            onClick={() => window.history.back()}
                            variant="outline"
                        >
                            Retour
                        </Button>
                    </GridItem>
                    <GridItem>
                        <Button
                            type="submit"
                            w="full"
                            colorScheme="blue"
                            isLoading={isProcessing}
                            loadingText="Traitement..."
                        >
                            Payer maintenant
                        </Button>
                    </GridItem>
                </Grid>
            </VStack>
        </Box>
    );
};