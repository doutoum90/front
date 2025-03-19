import { useState, useEffect } from 'react';
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
    Text,
    Spinner,
    Heading,
    Divider
} from '@chakra-ui/react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { PaymentFormProps } from '../../../types';
import { PRICE_MAP } from '../../../constantes';
export const PaymentForm = ({ user, plan, onSuccess }: PaymentFormProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const toast = useToast();
    const [error, setError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (stripe && elements) setLoading(false);
    }, [stripe, elements]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return setError("Le système de paiement n'est pas initialisé");

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) return setError('Les informations de carte sont incomplètes');

        setIsProcessing(true);
        setError('');

        try {
            const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: { name: `${user.name} ${user.lastname}`, email: user.email },
            });

            if (stripeError) throw new Error(stripeError.message || 'Erreur de paiement');

            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) throw new Error('Aucun token d\'accès disponible, veuillez vous reconnecter');

            const response = await fetch('/api/payments/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    paymentMethodId: paymentMethod.id,
                    planId: plan.id,
                    priceID: PRICE_MAP[plan.id as keyof typeof PRICE_MAP],
                    amount: plan.price * 100,
                    email: user.email,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Échec du paiement');
            }

            toast({
                title: 'Paiement réussi',
                description: `Abonnement ${plan.name} activé avec succès`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            onSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur lors du traitement du paiement');
        } finally {
            setIsProcessing(false);
        }
    };

    if (loading) {
        return (
            <Box textAlign="center" p={8}>
                <Spinner size="xl" />
                <Text mt={4}>Chargement du système de paiement...</Text>
            </Box>
        );
    }
    return (
        <Box maxW="md" mx="auto" p={6} borderWidth="1px" borderRadius="lg">
            <VStack spacing={6} as="form" onSubmit={handleSubmit}>
                <Heading size="md">Paiement sécurisé</Heading>

                <Box w="full">
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        Récapitulatif de la commande
                    </Text>
                    <Divider mb={4} />
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                        <GridItem>
                            <Text>Plan</Text>
                        </GridItem>
                        <GridItem textAlign="right">
                            <Text fontWeight="bold">{plan.name}</Text>
                        </GridItem>
                        <GridItem>
                            <Text>Prix mensuel</Text>
                        </GridItem>
                        <GridItem textAlign="right">
                            <Text fontWeight="bold">{plan.price}€</Text>
                        </GridItem>
                    </Grid>
                </Box>

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
                            isDisabled={isProcessing}
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

                <Text fontSize="sm" color="gray.500" textAlign="center">
                    Vos informations de paiement sont sécurisées et cryptées
                </Text>
            </VStack>
        </Box>
    );
};