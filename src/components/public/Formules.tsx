import { Heading, Text, Button, VStack, Table, Thead, Tr, Th, Tbody, Td, Box, HStack } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { FONCTIONNALITES, FORMULE_TITLES, COMMENTAIRES, SUBSCRIBE_BUTTON, FONCTIONNALITES_HEADER } from '../../constantes';
import { useNavigate } from 'react-router-dom';

export const Formules = () => {
    const navigate = useNavigate();
    const subscribe = (rowName: string) => {
        navigate('/subscription');
    }

    const computeRow = (row: any, rowName: string) => {
        if (row.type === 'btn') {
            return <Td textAlign="center" py={6}>
                <Button
                    variant="ghost"
                    color="white"
                    bg="#7cb3cf"
                    size="lg"
                    onClick={() => subscribe(rowName)}>
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
        <HStack
            spacing={0}
            width="100%"
            maxWidth="100vw"
            pt={12}
            px={{ base: 4, md: 8 }}
        >
            <VStack
                width="100%"
                maxWidth="container.xl"
                marginX="auto"
            >
                <Text size="xl" color="teal.600" mb={4}>
                    {FORMULE_TITLES.title}
                </Text>
                <Text size="xl" color="teal.600" mb={4}>
                    {FORMULE_TITLES.subtitle}
                </Text>
                <Table variant="simple" size="lg">
                    <Thead>
                        <Tr>
                            {FONCTIONNALITES_HEADER.map((header, index) => (
                                <Th bg="gray.200" fontSize="xl" borderRightWidth="1px" borderColor="whiteAlpha.300" key={index}>
                                    {header}
                                </Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {FONCTIONNALITES.map((fonctionnalite, index) => (
                            <Tr key={index}>
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
                    {COMMENTAIRES.map((commentaire, index) => (
                        <Text color="gray.600" lineHeight="tall" key={index}>
                            {commentaire.nom} <br />
                            {commentaire.commentaire}
                        </Text>
                    ))}
                    <Button ml={"auto"} bg="#3d84a8"
                        color="white"
                        borderRadius="2xl"
                        mx="auto"
                        size="lg"
                        px={4}
                        py={6}
                        _hover={{ transform: 'scale(1.05)' }}
                        transition="all 0.2s"
                        onClick={() => navigate('/subscription')}
                    >
                        {SUBSCRIBE_BUTTON}
                    </Button>
                </Box>
            </VStack>
        </HStack>
    </>
    );
};

export default Formules;
