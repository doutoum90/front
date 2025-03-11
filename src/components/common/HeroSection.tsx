import { Box, Heading, Text, Button, VStack, HStack, Divider, Flex } from '@chakra-ui/react';

export const HeroSection = () => {
    return (
        <Box maxW="container.xl" mx="auto" px={{ base: 4, md: 8 }} py={12}>
            {/* En-tête */}
            <VStack spacing={6} textAlign="center" mb={16} bg="gray.50" p={8} borderRadius="xl">
                <HStack justify="space-between">
                    <VStack>
                        <Heading as="h1" size="2xl" color="teal.600" fontWeight="bold">
                            INTELLIGENTSLA
                        </Heading>
                        <Text fontSize="xl" color="gray.600">
                            L'intelligence économique au service de votre activité
                        </Text>
                    </VStack>
                </HStack>


                <Flex wrap="wrap" justify="center" gap={8} mt={8}>
                    <Button variant="ghost" colorScheme="teal">Nos actions</Button>
                    <Button variant="ghost" colorScheme="teal">Nos formules</Button>
                    <Button variant="ghost" colorScheme="teal">FAQ</Button>
                    <Button variant="ghost" colorScheme="teal">À propos</Button>
                </Flex>
            </VStack>

            <Divider borderColor="gray.200" mb={16} />

            {/* Section principale */}
            <VStack spacing={12} align="stretch">
                <Box textAlign="center">
                    <Heading as="h2" size="lg" mb={6} color="gray.800">
                        Prenez une longueur d'avance avec l'intelligence Économique
                    </Heading>
                    <HStack spacing={8} justify="center">
                        <Text>Surveillez vos concurrents.</Text>
                        <Text>Détectez les opportunités.</Text>
                        <Text>Anticipez le marché.</Text>
                    </HStack>
                </Box>

                {/* Section Anticipez */}
                <VStack spacing={6} bg="gray.50" p={8} borderRadius="xl">
                    <Heading as="h3" size="md" color="teal.600">
                        Anticipez: Décidez. Gagnez.
                    </Heading>
                    <Text textAlign="center" lineHeight="tall" color="gray.600">
                        Dans un monde en constante évolution, chaque décision compte. Intelligentsla vous donne un coup d'avance grâce à
                        l'intelligence économique. Analysez votre marché, surveillez vos concurrents et détectez les opportunités avant
                        les autres. Grâce à notre technologie basée sur l'IA, nous transformons des milliers de données en informations
                        stratégiques exploitables, pour vous permettre de prendre les meilleures décisions, au bon moment.
                    </Text>
                </VStack>

                {/* Section Veille automatisée */}
                <VStack spacing={6} p={8}>
                    <Heading as="h3" size="md" color="teal.600">
                        Une veille automatisée, un avantage concurrentiel durable
                    </Heading>
                    <Text textAlign="center" lineHeight="tall" color="gray.600">
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
        </Box>
    );
};
export default HeroSection;