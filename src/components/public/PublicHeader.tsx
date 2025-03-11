import { Flex, Button, Text, Box, Heading, HStack, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const PublicHeader = () => {
    const navigate = useNavigate()

    return (
        <Box maxW="container.xl" mx="auto" px={{ base: 4, md: 8 }} py={12}>
            <HStack
                spacing={0} // Supprimer l'espacement entre les blocs
                mb={16}
                pl={8}
                pr={8}
                borderRadius="xl"
                width="100%"
                align="stretch"
            >
                {/* Bloc gauche (30%) */}
                <VStack
                    width="45%"
                    alignItems="flex-start"
                    pr={4} // Espacement interne
                >
                    <Heading as="h1" size="2xl" color="teal.600" fontWeight="bold">
                        INTELLIGENTSLA
                    </Heading>
                    <Text fontSize="xl" color="gray.600">
                        L'intelligence économique au service de votre activité
                    </Text>
                </VStack>

                {/* Bloc droit (70% avec fond bleu) */}
                <VStack
                    width="55%"
                    bg="#3d84a8" // Couleur de fond
                    borderRadius="xl"
                    justifyContent="center"
                >
                    <Flex width="100%" justifyContent="flex-end">
                        <Button
                            onClick={() => navigate('/auth/login')}
                            mr={8}
                            variant="outline"
                            colorScheme="blue"
                            color="blue.600"
                            bg='white'
                            borderColor="blue.200"
                            size="lg"
                            _hover={{
                                bg: "blue.50",
                                transform: "scale(1.05)"
                            }}
                            _active={{
                                bg: "blue.100"
                            }}
                            transition="all 0.2s"
                        >
                            Espace client
                        </Button>
                    </Flex>
                </VStack>
            </HStack>

            <Flex wrap="wrap" justify="center" gap={8} mt={8}>
                <Button
                    variant="ghost"
                    colorScheme="teal"
                    onClick={() => navigate('/actions')}
                >Nos actions</Button>
                <Button
                    variant="ghost"
                    colorScheme="teal"
                    onClick={() => navigate('/formules')}
                >Nos formules</Button>
                <Button
                    variant="ghost"
                    colorScheme="teal"
                    onClick={() => navigate('/faq')}
                >FAQ</Button>
                <Button
                    variant="ghost"
                    colorScheme="teal"
                    onClick={() => navigate('/about')}
                >À propos</Button>
            </Flex>
        </Box>
    )
}