import { useState } from 'react';
import { Button, Input, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';

export const Payments = () => {
    const [userId, setUserId] = useState('');
    const [priceId, setPriceId] = useState('price_1Q2222222222222222222222'); // Remplacez par un ID de prix Stripe
    const [status, setStatus] = useState('');

    const subscribe = async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        try {
            const response = await axios.post(
                '/api/payments/subscribe',
                { userId, priceId },
                { headers: { Authorization: `Bearer ${refreshToken}` } }
            );
            setStatus('Souscription créée : ' + response.data.status);
        } catch (error) {
            console.error('Erreur lors de la souscription :', error);
        }
    };

    const cancel = async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        try {
            const response = await axios.post(
                '/api/payments/cancel',
                { userId },
                { headers: { Authorization: `Bearer ${refreshToken}` } }
            );
            setStatus('Souscription annulée');
        } catch (error) {
            console.error('Erreur lors de l\'annulation :', error);
        }
    };

    const checkStatus = async () => {
        const refreshToken = localStorage.getItem('refresh_token');;
        try {
            const response = await axios.post(
                '/api/payments/status',
                { userId },
                { headers: { Authorization: `Bearer ${refreshToken}` } }
            );
            setStatus('Statut : ' + response.data.status);
        } catch (error) {
            console.error('Erreur lors de la vérification du statut :', error);
        }
    };

    return (
        <VStack spacing={4}>
            <Input placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
            <Input placeholder="Price ID" value={priceId} onChange={(e) => setPriceId(e.target.value)} />
            <Button onClick={subscribe} colorScheme="teal">S'abonner</Button>
            <Button onClick={cancel} colorScheme="red">Annuler</Button>
            <Button onClick={checkStatus} colorScheme="blue">Vérifier Statut</Button>
            <Text>{status}</Text>
        </VStack>
    );
};

export default Payments;