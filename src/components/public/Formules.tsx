import { Heading, Text, Button, VStack, Table, Thead, Tr, Th, Tbody, Td, Box } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { FONCTIONNALITES, FORMULE_TITLES, COMMENTAIRES, SUBSCRIBE_BUTTON, FONCTIONNALITES_HEADER } from '../../constantes';

export const Formules = () => {
    const subscribe = (rowName: string) => {
        console.log('soucription', rowName);
    }

    const computeRow = (row: any, rowName: string) => {
        if (row.type === 'btn') {
            return <Td textAlign="center" py={6}>
                <Button colorScheme="teal" variant="outline" size="lg" onClick={() => subscribe(rowName)}>
                    {SUBSCRIBE_BUTTON}
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
                    {FORMULE_TITLES.title}
                </Text>


                <Text size="xl" color="teal.600" mb={4}>
                    {FORMULE_TITLES.subtitle}
                </Text>


                <Table variant="simple" size="lg">
                    <Thead>
                        <Tr>
                            {FONCTIONNALITES_HEADER.map((header) => (
                                <Th bg="gray.200" fontSize="xl" borderRightWidth="1px" borderColor="whiteAlpha.300">
                                    {header}
                                </Th>
                            ))}
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
                        {FORMULE_TITLES.commentaires}
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
                        {SUBSCRIBE_BUTTON}
                    </Button>
                </Box>
            </Box>


        </VStack>
    </>
    );
};

export default Formules;
