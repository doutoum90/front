import { Heading, Text, Button, VStack, Table, Thead, Tr, Th, Tbody, Td, useColorModeValue, Box } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';


export const Formules = () => {
    const FONCTIONNALITES = [
        {
            nom: "Veille concurrentielle",
            essentiel: true,
            pro: true,
            expert: true,
            type: 'check'
        },
        {
            nom: "Cartographie des risques",
            essentiel: false,
            pro: true,
            expert: true,
            type: 'check'
        },
        {
            nom: "Rapports détaillés",
            essentiel: false,
            pro: true,
            expert: true,
            type: 'check'
        },
        {
            nom: "Alertes stratégiques",
            essentiel: true,
            pro: true,
            expert: true,
            type: 'check'
        },
        {
            nom: "Accès API",
            essentiel: false,
            pro: false,
            expert: true,
            type: 'check'
        },
        {
            nom: "Support dédié",
            essentiel: 'Email',
            pro: 'Chat',
            expert: 'Prioritaire',
            type: 'text'
        },
        {
            nom: "Prix",
            essentiel: '29€',
            pro: '59€',
            expert: '99€',
            type: 'text'
        },
        {
            nom: "S'abonner",
            essentiel: "S'abonner",
            pro: "S'abonner",
            expert: "S'abonner",
            type: 'btn'
        }
    ]

    const TITLE = "⭐ Ce qu’ils disent de nous"
    const COMMENTAIRES = [
        {
            nom: " 📢 Claire M. - Dirigeante d’une PME",
            commentaire: "Grâce à Intelligentsia, nous avons pu anticiper une évolution réglementaire majeure qui aurait pu impacter notre activité. Un vrai game-changer !"
        },
        {
            nom: " 📢 Julien D. - Responsable Stratégie",
            commentaire: "Les rapports stratégiques sur demande sont précis et ultra-pertinents. Un outil indispensable pour notre expansion à l’international."
        },
        {
            nom: " 📢 Sophie L. - Fondatrice d’une startup tech",
            commentaire: "La veille concurrentielle automatisée nous permet de rester réactifs et de toujours avoir un coup d’avance sur le marché."
        }
    ]

    const subscribe = (rowName: string) => {
        console.log('soucription', rowName);
    }

    const computeRow = (row: any, rowName: string) => {
        if (row.type === 'btn') {
            return <Td textAlign="center" py={6}>
                <Button colorScheme="teal" variant="outline" size="lg" onClick={() => subscribe(rowName)}>
                    S'abonner
                </Button>
            </Td>
        } else if (row.type === 'text') {
            return <Td textAlign="center">{row[rowName]}</Td>
        } else if (row.type === 'check') {
            return <Td textAlign="center"><CheckIcon color={row[rowName] ? "green.500" : "red.500"} /></Td>
        }
    }
    return (<>
        <VStack spacing={12} bg="gray.100" mt={0} pt={12} pl={120} pr={120}>
            <Box>
                <Text size="xl" color="teal.600" mb={4}>
                    Choisissez la formule qui accélère votre croissance.
                </Text>


                <Text size="xl" color="teal.600" mb={4}>
                    Des solutions adaptées à chaque entreprise, de la veille stratégique à l’analyse avancée.
                </Text>


                <Table variant="simple" size="lg">
                    <Thead>
                        <Tr>
                            <Th bg="gray.200" fontSize="xl" borderRightWidth="1px" borderColor="whiteAlpha.300">
                                Fonctionnalités
                            </Th>
                            <Th bg="gray.200" fontSize="xl" textAlign="center">Essentiel</Th>
                            <Th bg="gray.200" fontSize="xl" textAlign="center">Pro</Th>
                            <Th bg="gray.200" fontSize="xl" textAlign="center">Expert</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {FONCTIONNALITES.map((fonctionnalite) => (
                            <Tr>
                                <Td fontWeight="semibold">{fonctionnalite.nom}</Td>
                                {computeRow(fonctionnalite, 'essentiel')}
                                {computeRow(fonctionnalite, 'pro')}
                                {computeRow(fonctionnalite, 'expert')}
                            </Tr>
                        ))}

                    </Tbody>
                </Table>

                <Box>
                    <Heading as="h3" size="md" color="gray.800" mb={4}>
                        {TITLE}
                    </Heading>
                    {COMMENTAIRES.map((commentaire) => (
                        <Text color="gray.600" lineHeight="tall">
                            {commentaire.nom} <br />
                            {commentaire.commentaire}
                        </Text>
                    ))}


                    <Button ml={"auto"} bg="#3d84a8"
                        color="white"
                        borderRadius="2xl"
                        size="lg"
                        px={4}
                        py={6}
                        _hover={{ transform: 'scale(1.05)' }}
                        transition="all 0.2s"
                    >
                        S'abonner
                    </Button>
                </Box>
            </Box>


        </VStack>
    </>
    );
};

export default Formules;
