import { useState } from 'react';
import { Box, Heading, Text, Textarea, Button } from '@chakra-ui/react';

export const Contact = () => {
    const [message, setMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });

            if (response.ok) {
                setResponseMessage('Votre message a été envoyé avec succès.');
                setMessage('');
            } else {
                setResponseMessage('Erreur lors de l\'envoi du message.');
            }
        } catch (error) {
            setResponseMessage('Erreur lors de l\'envoi du message.');
        }
    };

    return (
        <Box as="section" p={6}>
            <Heading size="lg" mb={4}>Contactez-nous</Heading>
            <Text mb={4}>Nous serions ravis d'avoir de vos nouvelles. Veuillez laisser un message ci-dessous :</Text>
            <form onSubmit={handleSubmit}>
                <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Votre message"
                    required
                    mb={4}
                />
                <Button type="submit" colorScheme="teal">Envoyer</Button>
            </form>
            {responseMessage && <Text mt={4}>{responseMessage}</Text>}
        </Box>
    );
};

