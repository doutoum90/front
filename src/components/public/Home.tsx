import {
    Box,
    Button,
    Container,
    Heading,
    Text,
    Image,
    Stack,
    SimpleGrid,
    Card,
    CardBody,
    CardHeader,
    useBreakpointValue,
    Flex,
    Link
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();
    const connect = () => {
        navigate('/login');
    }
    const register = () => {
        navigate('/register');
    }

    const columnSize = useBreakpointValue({ base: 1, md: 2, lg: 3 })

    return (
        <Box as="section" bg="gray.50" py={{ base: '6', md: '12' }}>
            <Flex
                as="nav"
                align="center"
                justify="space-between"
                px={{ base: '4', md: '8' }}
                py="4"
                bg="white"
                boxShadow="sm"
                position="sticky"
                top="0"
                zIndex="docked"
            >
                <Flex align="center" gap={6}>
                    {/* Logo ou nom de l'application */}
                    <Text fontWeight="bold" color="teal.600">MonApp</Text>

                    {/* Menu de navigation */}
                    <Flex gap={4} display={{ base: 'none', md: 'flex' }}>
                        <Link href="#" color="gray.600" _hover={{ color: 'teal.500' }}>
                            Accueil
                        </Link>
                        <Link href="/about" color="gray.600" _hover={{ color: 'teal.500' }}>
                            About
                        </Link>
                        <Link href="/contact" color="gray.600" _hover={{ color: 'teal.500' }}>
                            Contact
                        </Link>
                    </Flex>
                </Flex>

                {/* Bouton de connexion */}
                <Flex gap={4} align="center">
                    <Button
                        colorScheme="teal"
                        variant="outline"
                        size="sm"
                        onClick={connect}
                    >
                        Se connecter
                    </Button>
                    <Button
                        colorScheme="teal"
                        size="sm"
                        onClick={register}
                    >
                        S'inscrire
                    </Button>
                </Flex>
            </Flex>
            <Container maxW="100%" p={0}> {/* p={0} pour supprimer le padding interne */}
                {/* En-tête avec une introduction */}
                <Stack
                    spacing={{ base: 4, md: 6 }}
                    textAlign="center"
                    mb={{ base: '6', md: '12' }}
                    px={{ base: '4', md: '8' }} // Ajout du padding horizontal uniquement ici
                >
                    <Heading size="2xl" color="teal.600">
                        Bienvenue sur notre application !
                    </Heading>
                    <Text fontSize="lg" color="gray.600">
                        Explorez nos fonctionnalités et commencez votre aventure dès maintenant.
                    </Text>
                    <Button colorScheme="teal" size="lg" mt="4" onClick={() => alert('Explorez maintenant !')}>
                        Commencer
                    </Button>
                </Stack>

                {/* Section de cartes d'introduction */}
                <SimpleGrid
                    columns={{ base: 1, md: 2, lg: columnSize }}
                    spacing="8"
                    px={{ base: '4', md: '8' }} // Padding horizontal pour les cartes
                >
                    <Card width="100%" boxShadow="lg" borderRadius="md">
                        <CardHeader>
                            <Heading size="md" color="teal.500">
                                Une expérience fluide
                            </Heading>
                        </CardHeader>
                        <CardBody>
                            <Text color="gray.600">
                                Profitez d'une interface simple et fluide, conçue pour vous offrir une expérience optimale.
                            </Text>
                        </CardBody>
                    </Card>

                    <Card width="100%" boxShadow="lg" borderRadius="md">
                        <CardHeader>
                            <Heading size="md" color="teal.500">
                                Performances incroyables
                            </Heading>
                        </CardHeader>
                        <CardBody>
                            <Text color="gray.600">
                                Nous mettons l'accent sur la rapidité et la performance pour vous offrir la meilleure expérience.
                            </Text>
                        </CardBody>
                    </Card>

                    <Card width="100%" boxShadow="lg" borderRadius="md">
                        <CardHeader>
                            <Heading size="md" color="teal.500">
                                Une interface réactive
                            </Heading>
                        </CardHeader>
                        <CardBody>
                            <Text color="gray.600">
                                Votre application sera belle et fonctionnelle sur tous les appareils.
                            </Text>
                        </CardBody>
                    </Card>
                </SimpleGrid>

                {/* Image section */}
                <Box mt="12" display="flex" justifyContent="center" px={{ base: '4', md: '8' }}>
                    <Image
                        src="https://via.placeholder.com/600x400"
                        width="100%"
                        maxW="1200px"
                        alt="Illustration"
                        borderRadius="md"
                        shadow="lg"
                    />
                </Box>
            </Container>
        </Box>
    )
}

