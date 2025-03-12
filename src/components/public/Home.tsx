import { Text, Button, Box, HStack, VStack } from '@chakra-ui/react';

const Home = () => {

  const TITLES = {
    "title": "Prenez une longueur d'avance avec l'intelligence Économique",
    "subtitle1": "📡Surveillez vos concurrents.",
    "subtitle2": "💡Détectez les opportunités.",
    "subtitle3": "🚀Anticipez le marché."
  }
  const PARAGRAPHS = [{
    title: " Anticipez: Décidez. Gagnez.",
    description: "Dans un monde en constante évolution, chaque décision compte. Intelligentsla vous donne un coup d'avance grâce à l'intelligence économique. Analysez votre marché, surveillez vos concurrents et détectez les opportunités avant les autres. Grâce à notre technologie basée sur l'IA, nous transformons des milliers de données en informations stratégiques exploitables, pour vous permettre de prendre les meilleures décisions, au bon moment.",
  },
  {
    title: "Une veille automatisée, un avantage concurrentiel durable",
    description: "Finies les recherches interminables et les décisions basées sur l'intuition. Notre plateforme vous alerte en temps réel sur les tendances, les évolutions du marché et les opportunités d'affaires adaptées à votre activité. Que vous soyez une TPE ou un entrepreneur ambitieux, Intelligentsla vous offre les outils pour comprendre, anticiper et dominer votre secteur."
  }]

  return (
    <>
      <VStack width="100%" spacing={12} bg="gray.100" mt={0} pt={12}  px={{ base: 4, md: 8 }}>
        <Box textAlign="center">
          <Text as="h6" size="lg" mb={6} color="gray.800">
            {TITLES.title}
          </Text>
          <HStack spacing={8} justify="center">
            <Text>{TITLES.subtitle1}</Text>
            <Text>{TITLES.subtitle2}</Text>
            <Text>{TITLES.subtitle3}</Text>
          </HStack>
        </Box>
        <HStack
          spacing={0} // Supprimer l'espacement entre les blocs
          borderRadius="xl"
          width="100%"
          align="stretch"
        >
          <VStack width="80%"
            alignItems="flex-start" textAlign="left">
            {PARAGRAPHS.map((paragraph) => (
              <>
                <Text size="md" fontWeight="bold" fontSize="xl">
                  {paragraph.title}
                </Text>
                <Text lineHeight="tall" color="gray.600" mb={4}>
                  {paragraph.description}
                </Text>
              </>
            ))}
          </VStack>
          <VStack
            pt={12}
            justifyContent="center"
            alignItems="center"
            height="100%">
            <Button
              bg="#3d84a8"
              color="white"
              whiteSpace="pre-line"
              height="auto"
              minHeight="48px"
              px={4}
              py={6}
              borderRadius="2xl"
              _hover={{ transform: 'scale(1.05)' }}
              transition="all 0.2s"
            >
              {"Démarrer tout de suite\nvotre essai gratuit"}
            </Button>
          </VStack>
        </HStack>
      </VStack>
    </>
  );
};

export default Home;