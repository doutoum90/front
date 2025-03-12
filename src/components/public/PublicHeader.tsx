import { Flex, Button, Text, Box, Heading, HStack, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const PublicHeader = () => {
    const navigate = useNavigate()

    return (
        <Box maxW="100%" m={0} p={0}>
            <HStack
                spacing={0} // Supprimer l'espacement entre les blocs
                borderRadius="xl"
                width="100%"
                align="stretch"
            >
                {/* Bloc gauche (30%) */}
                <VStack
                    width="30%"
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
                    width="70%"
                    bg="#3d84a8"
                    justifyContent="center"
                    pr={0}
                    mr={0}
                >
                    <Flex width="100%" justifyContent="flex-end" pt={8} pr={8}>
                        <Button
                            onClick={() => navigate('/auth/login')}
                            mr={8}
                            variant="outline"
                            color="#7cb3cf"
                            bg='white'
                            borderColor="blue.200"
                            borderRadius="xl"
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
                    <Flex width="100%" justify="flex-start" pl={8} mb={-8}>
                        <Button
                            variant="ghost"
                            color="white"
                            bg="#7cb3cf"
                            size="lg"
                            onClick={() => navigate('/actions')}
                        >Nos actions</Button>
                        <Button
                            variant="ghost"
                            size="lg"
                            color="white"
                            bg="#7cb3cf"
                            onClick={() => navigate('/formules')}
                        >Nos formules</Button>
                        <Button
                            variant="ghost"
                            color="white"
                            size="lg"
                            bg="#7cb3cf"
                            onClick={() => navigate('/faq')}
                        >FAQ</Button>
                        <Button
                            variant="ghost"
                            color="white"
                            size="lg"
                            bg="#7cb3cf"
                            onClick={() => navigate('/about')}
                        >À propos</Button>
                    </Flex>
                </VStack>
            </HStack>


        </Box>
    )
}