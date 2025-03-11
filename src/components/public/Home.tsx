import { Heading, Text, Button, Box, HStack, VStack } from '@chakra-ui/react';

const Home = () => {

  return (
    <>
      <VStack spacing={12} align="stretch">
        <Box textAlign="center">
          <Heading as="h2" size="lg" mb={6} color="gray.800">
            Prenez une longueur d'avance avec l'intelligence Économique
          </Heading>
          <HStack spacing={8} justify="center">
            <Text>📡Surveillez vos concurrents.</Text>
            <Text>💡Détectez les opportunités.</Text>
            <Text>🚀Anticipez le marché.</Text>
          </HStack>
        </Box>

        {/* Section Anticipez */}
        <VStack spacing={6} bg="gray.50" borderRadius="xl">
          <Heading as="h3" size="md" color="teal.600" textAlign="left" >
            Anticipez: Décidez. Gagnez.
          </Heading>
          <Text textAlign="left" lineHeight="tall" color="gray.600">
            Dans un monde en constante évolution, chaque décision compte. Intelligentsla vous donne un coup d'avance grâce à
            l'intelligence économique. Analysez votre marché, surveillez vos concurrents et détectez les opportunités avant
            les autres. Grâce à notre technologie basée sur l'IA, nous transformons des milliers de données en informations
            stratégiques exploitables, pour vous permettre de prendre les meilleures décisions, au bon moment.
          </Text>
        </VStack>

        {/* Section Veille automatisée */}
        <VStack spacing={6}>
          <Heading as="h3" size="md" color="teal.600" textAlign="left">
            Une veille automatisée, un avantage concurrentiel durable
          </Heading>
          <Text textAlign="left" lineHeight="tall" color="gray.600">
            Finies les recherches interminables et les décisions basées sur l'intuition. Notre plateforme vous alerte en temps
            réel sur les tendances, les évolutions du marché et les opportunités d'affaires adaptées à votre activité. Que
            vous soyez une TPE ou un entrepreneur ambitieux, Intelligentsla vous offre les outils pour comprendre, anticiper
            et dominer votre secteur.
          </Text>
        </VStack>

        {/* CTA */}
        <Button
          colorScheme="teal"
          size="lg"
          mx="auto"
          px={12}
          _hover={{ transform: 'scale(1.05)' }}
          transition="all 0.2s"
        >
          Démarrer tout de suite votre essai gratuit
        </Button>
      </VStack>
    </>
  );
};

export default Home;