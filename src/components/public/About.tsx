import { Heading, Text, Button, Textarea } from '@chakra-ui/react';
import { useState } from 'react';

export const About = () => {
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
  return (<>
    <Heading size="2xl" color="teal.600" mb="4">
      À propos de notre application
    </Heading>
    <Text fontSize="lg" color="gray.600" mb="6">
      Notre application est conçue pour offrir une expérience utilisateur exceptionnelle.
      Nous nous engageons à fournir des fonctionnalités de qualité et un support client réactif.
    </Text>
    <Button colorScheme="teal" size="lg" onClick={() => alert('Merci de votre intérêt !')}>
      En savoir plus
    </Button>

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
  </>

  );
};

export default About;
