import { Flex, Button, Text, Box, Heading, HStack, VStack } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { MENU } from "../../constantes";
export const PublicHeader = () => {

    const navigate = useNavigate();
    const location = useLocation();

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
                        {MENU.map((btn, index) => (
                            <Button
                                key={index}
                                variant={location.pathname === btn.link ? 'solid' : 'ghost'}
                                color={location.pathname === btn.link ? 'blue.800' : 'white'}
                                bg={location.pathname === btn.link ? 'gray.200' : '#7cb3cf'}
                                _hover={{
                                    bg: location.pathname === btn.link ? 'blue.700' : 'blue.50'
                                }}
                                size="lg"
                                onClick={() => navigate(btn.link)}
                                mr={4}
                                borderBottom={location.pathname === btn.link ? '2px solid' : 'none'}
                                borderColor="white"
                            >
                                {btn.label}
                            </Button>
                        ))}
                    </Flex>
                </VStack>
            </HStack>


        </Box>
    )
}

export default PublicHeader;