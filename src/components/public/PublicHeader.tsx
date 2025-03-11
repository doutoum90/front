import { Flex, Button, Text, Link } from "@chakra-ui/react";

import { useNavigate } from 'react-router-dom';


export const PublicHeader = () => {
    const navigate = useNavigate();
    const connect = () => {
        navigate('/auth/login');
    }
    const register = () => {
        navigate('/auth/register');
    }
    return (
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
                    <Link href="/" color="gray.600" _hover={{ color: 'teal.500' }}>
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

    )
}