import { Heading, Text, Button, VStack, Table, Thead, Tr, Th, Tbody, Td, useColorModeValue, UnorderedList, ListItem, Box } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';


export const Formules = () => {
    const headerBg = useColorModeValue('teal.600', 'teal.700');
    const featureBg = useColorModeValue('gray.50', 'gray.800');
    return (<>
        <VStack spacing={6} align="stretch" width={"100%"} textAlign="left">
            <Heading size="xl" color="teal.600" mb={4}>
                Choisissez la formule qui accélère votre croissance.
            </Heading>


            <Text fontSize="lg" color="gray.600" mb="6">
                Des solutions adaptées à chaque entreprise, de la veille stratégique à l’analyse avancée.
            </Text>


            <Table variant="simple" size="lg">
                <Thead bg={headerBg}>
                    <Tr>
                        <Th color="white" fontSize="xl" borderRightWidth="1px" borderColor="whiteAlpha.300">
                            Fonctionnalités
                        </Th>
                        <Th color="white" fontSize="xl" textAlign="center">Essentiel</Th>
                        <Th color="white" fontSize="xl" textAlign="center">Pro</Th>
                        <Th color="white" fontSize="xl" textAlign="center">Expert</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {/* Ligne Veille concurrentielle */}
                    <Tr>
                        <Td bg={featureBg} fontWeight="semibold">Veille concurrentielle</Td>
                        <Td textAlign="center"><CheckIcon color="green.500" /></Td>
                        <Td textAlign="center"><CheckIcon color="green.500" /></Td>
                        <Td textAlign="center"><CheckIcon color="green.500" /></Td>
                    </Tr>

                    {/* Ligne Cartographie des risques */}
                    <Tr>
                        <Td bg={featureBg} fontWeight="semibold">Cartographie des risques</Td>
                        <Td textAlign="center"><CloseIcon color="red.500" /></Td>
                        <Td textAlign="center"><CheckIcon color="green.500" /></Td>
                        <Td textAlign="center"><CheckIcon color="green.500" /></Td>
                    </Tr>

                    {/* Ligne Rapports détaillés */}
                    <Tr>
                        <Td bg={featureBg} fontWeight="semibold">Rapports détaillés</Td>
                        <Td textAlign="center"><CloseIcon color="red.500" /></Td>
                        <Td textAlign="center"><CheckIcon color="green.500" /></Td>
                        <Td textAlign="center"><CheckIcon color="green.500" /></Td>
                    </Tr>

                    {/* Ligne Accès API */}
                    <Tr>
                        <Td bg={featureBg} fontWeight="semibold">Accès API</Td>
                        <Td textAlign="center"><CloseIcon color="red.500" /></Td>
                        <Td textAlign="center"><CloseIcon color="red.500" /></Td>
                        <Td textAlign="center"><CheckIcon color="green.500" /></Td>
                    </Tr>

                    {/* Ligne Support dédié */}
                    <Tr>
                        <Td bg={featureBg} fontWeight="semibold">Support dédié</Td>
                        <Td textAlign="center"><Text>Email</Text></Td>
                        <Td textAlign="center"><Text>Chat</Text></Td>
                        <Td textAlign="center"><Text>Prioritaire</Text></Td>
                    </Tr>

                    {/* Ligne Prix */}
                    <Tr borderTopWidth="2px" borderColor="gray.100">
                        <Td bg={featureBg} fontWeight="semibold">Prix (€/mois)</Td>
                        <Td textAlign="center"><Text fontSize="2xl" fontWeight="bold">29€</Text></Td>
                        <Td textAlign="center"><Text fontSize="2xl" fontWeight="bold">59€</Text></Td>
                        <Td textAlign="center"><Text fontSize="2xl" fontWeight="bold">99€</Text></Td>
                    </Tr>

                    {/* Ligne Boutons */}
                    <Tr>
                        <Td bg={featureBg}></Td>
                        <Td textAlign="center" py={6}>
                            <Button colorScheme="teal" variant="outline" size="lg">
                                S'abonner
                            </Button>
                        </Td>
                        <Td textAlign="center" py={6}>
                            <Button colorScheme="teal" variant="outline" size="lg">
                                S'abonner
                            </Button>
                        </Td>
                        <Td textAlign="center" py={6}>
                            <Button colorScheme="teal" size="lg">
                                S'abonner
                            </Button>
                        </Td>
                    </Tr>
                </Tbody>
            </Table>

            <Box>
                <Heading as="h3" size="md" color="gray.800" mb={4}>
                    ⭐ Ce qu’ils disent de nous
                </Heading>
                <Text color="gray.600" lineHeight="tall">
                    📢 Claire M. - Dirigeante d’une PME
                    "Grâce à Intelligentsia, nous avons pu anticiper une évolution réglementaire majeure qui aurait pu impacter notre activité. Un vrai game-changer !"
                </Text>
                <Text color="gray.600" lineHeight="tall">
                    📢 Julien D. - Responsable Stratégie
                    "Les rapports stratégiques sur demande sont précis et ultra-pertinents. Un outil indispensable pour notre expansion à l’international."
                </Text>
                <Text color="gray.600" lineHeight="tall">
                    📢 Sophie L. - Fondatrice d’une startup tech
                    "La veille concurrentielle automatisée nous permet de rester réactifs et de toujours avoir un coup d’avance sur le marché."
                </Text>

                <Button ml={"auto"} colorScheme="teal" size="lg">
                    S'abonner
                </Button>
            </Box>



        </VStack>
    </>
    );
};

export default Formules;
