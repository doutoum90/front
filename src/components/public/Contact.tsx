import { useState } from 'react';
import { Heading, Text, Textarea, Button } from '@chakra-ui/react';

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
    <>
      <Heading size="2xl" color="teal.600" mb="4">
        Contactez-nous
      </Heading>
      <Text fontSize="lg" color="gray.600" mb="6">
        Nous serions ravis d'avoir de vos nouvelles. Veuillez laisser un message ci-dessous :
      </Text>
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
    </>
  );
};

export default Contact;
