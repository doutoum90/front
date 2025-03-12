import { Heading, Text, Button, Textarea, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, VStack, HStack } from '@chakra-ui/react';
import { useState } from 'react';
import { PARAGRAPHS, ABOUT_TITLES } from '../../constantes';

export const About = () => {
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/support/contact', {
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
    <HStack
      spacing={0}
      width="100%"
      maxWidth="100vw"
      pt={120}
      px={{ base: 4, md: 8 }}
    >
      <VStack
        width="100%"
        maxWidth="container.xl"
        marginX="auto"
      >
        <Text fontSize="lg" color="gray.600" textAlign="center">
          {ABOUT_TITLES.title}
        </Text>

        <Text fontSize="lg" color="gray.600" textAlign="center">
          {ABOUT_TITLES.subtitle}
        </Text>

        <Accordion allowToggle w="100%">
          {PARAGRAPHS.map((paragraph) => (
            <AccordionItem border="none" mb={4}>
              <AccordionButton
                _hover={{ bg: 'teal.50' }}
                py={6}
                borderRadius="md"
              >
                <Box flex="1" textAlign="left" fontSize="xl" fontWeight="semibold">
                  {paragraph.title}
                </Box>
                <AccordionIcon color="teal.600" boxSize={8} />
              </AccordionButton>

              <AccordionPanel pb={4} bg="teal.50" borderRadius="md">
                <VStack spacing={6} align="stretch">
                  {paragraph.sousParagraphs.map((sousParagraph) => (
                    <Box>
                      <Text fontWeight="600" fontSize="lg" color="teal.700" textAlign="left">{sousParagraph.title}</Text>
                      <Text color="gray.600" mt={2} textAlign="left">
                        {sousParagraph.description}
                      </Text>
                    </Box>
                  ))}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>

        <Box mt={12}>
          <Heading size="xl" color="teal.600" mb={6}>
            Contactez-nous
          </Heading>
          <Text fontSize="lg" color="gray.600" mb={8}>
            Nous serions ravis d'avoir de vos nouvelles. Veuillez laisser un message ci-dessous :
          </Text>
          <form onSubmit={handleSubmit}>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Votre message"
              required
              mb={6}
              minH="150px"
              focusBorderColor="teal.400"
            />
            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              _hover={{ transform: 'scale(1.02)' }}
              transition="all 0.2s"
            >
              Envoyer
            </Button>
          </form>
          {responseMessage && <Text mt={4} color={responseMessage.includes('succès') ? 'green.600' : 'red.600'}>{responseMessage}</Text>}
        </Box>
      </VStack>
    </HStack>
  );
};

export default About;