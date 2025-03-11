import { Heading, Text, Button, Textarea, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, VStack } from '@chakra-ui/react';
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

  return (
    <VStack spacing={8} align="stretch" textAlign="left">
      <Heading size="2xl" color="teal.600" mb={4}>
        Intelligentsia, votre allié en intelligence économique
      </Heading>
      
      <Text fontSize="lg" color="gray.600">
        Nous transformons l'information en décision stratégique pour vous donner un temps d'avance.
      </Text>

      <Accordion allowToggle>
        {/* Section Présentation */}
        <AccordionItem border="none" mb={4}>
          <AccordionButton 
            _hover={{ bg: 'teal.50' }}
            py={6}
            borderRadius="md"
          >
            <Box flex="1" textAlign="left" fontSize="xl" fontWeight="semibold">
              Présentation de l'Entreprise
            </Box>
            <AccordionIcon color="teal.600" boxSize={8} />
          </AccordionButton>
          
          <AccordionPanel pb={4} bg="teal.50" borderRadius="md">
            <VStack spacing={6} align="stretch">
              <Box>
                <Text fontWeight="600" fontSize="lg" color="teal.700">🚀 Qui sommes-nous ?</Text>
                <Text color="gray.600" mt={2}>
                  Intelligentsia est une plateforme d'intelligence économique qui accompagne les entreprises 
                  dans leur prise de décision stratégique. Grâce à l'IA et à l'analyse avancée des données, 
                  nous aidons les TPE et PME à anticiper les tendances et à optimiser leur compétitivité.
                </Text>
              </Box>
              
              <Box>
                <Text fontWeight="600" fontSize="lg" color="teal.700">🎯 Notre mission</Text>
                <Text color="gray.600" mt={2}>
                  Notre mission est de démocratiser l'intelligence économique en rendant accessible des outils 
                  puissants de veille, d'analyse et de reporting. Nous permettons aux entreprises de mieux 
                  comprendre leur marché, de détecter les opportunités et de minimiser les risques.
                </Text>
              </Box>
            </VStack>
          </AccordionPanel>
        </AccordionItem>

        {/* Section Valeurs */}
        <AccordionItem border="none">
          <AccordionButton 
            _hover={{ bg: 'teal.50' }}
            py={6}
            borderRadius="md"
          >
            <Box flex="1" textAlign="left" fontSize="xl" fontWeight="semibold">
              Nos Valeurs
            </Box>
            <AccordionIcon color="teal.600" boxSize={8} />
          </AccordionButton>
          
          <AccordionPanel pb={4} bg="teal.50" borderRadius="md">
            <VStack spacing={6} align="stretch">
              <Box>
                <Text fontWeight="600" fontSize="lg" color="teal.700">💡 Innovation</Text>
                <Text color="gray.600" mt={2}>
                  Nous mettons l'intelligence artificielle au service de la stratégie pour offrir des analyses 
                  précises et actionnables.
                </Text>
              </Box>
              
              <Box>
                <Text fontWeight="600" fontSize="lg" color="teal.700">🤝 Transparence</Text>
                <Text color="gray.600" mt={2}>
                  Nos données et nos analyses sont claires et fiables, permettant une prise de décision éclairée.
                </Text>
              </Box>
              
              <Box>
                <Text fontWeight="600" fontSize="lg" color="teal.700">📊 Performance</Text>
                <Text color="gray.600" mt={2}>
                  Nos outils sont conçus pour offrir des insights pertinents et un réel avantage concurrentiel 
                  à nos clients.
                </Text>
              </Box>
              
              <Box>
                <Text fontWeight="600" fontSize="lg" color="teal.700">🌍 Vision internationale</Text>
                <Text color="gray.600" mt={2}>
                  Nous accompagnons les entreprises dans leur expansion en leur fournissant une vision globale 
                  du marché.
                </Text>
              </Box>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      {/* Section Contact */}
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
  );
};

export default About;