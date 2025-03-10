import { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Text,
    VStack,
    Alert,
    AlertIcon,
    useColorModeValue
} from '@chakra-ui/react';

import { useAuth } from '../../contexts/AuthContext';

export const RegisterForm = () => {
    const { register } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const formBg = useColorModeValue('white', 'gray.700');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        try {
            await register({ email, password });
        } catch (err) {
            setError('Une erreur est survenue lors de l\'inscription');
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minH="100vh"
            width="100vw"
            p={4}
        >
            <Box
                as="form"
                onSubmit={handleSubmit}
                bg={formBg}
                p={8}
                borderRadius="xl"
                boxShadow="2xl"
                width="100%"
                maxW="md"
                textAlign="center"
            >
                <VStack spacing={6} align="stretch">
                    <Heading size="xl" color="teal.600" fontWeight="extrabold" mb={6}>
                        Créer un compte
                    </Heading>

                    {error && (
                        <Alert status="error" borderRadius="md" variant="subtle">
                            <AlertIcon />
                            {error}
                        </Alert>
                    )}

                    <FormControl id="email" isRequired>
                        <FormLabel fontSize="md">Email</FormLabel>
                        <Input
                            type="email"
                            size="lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="votre@email.com"
                            focusBorderColor="teal.500"
                            borderRadius="md"
                        />
                    </FormControl>

                    <FormControl id="password" isRequired>
                        <FormLabel fontSize="md">Mot de passe</FormLabel>
                        <InputGroup size="lg">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                focusBorderColor="teal.500"
                                borderRadius="md"
                            />
                            <InputRightElement width="4.5rem" mr={1}>
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={() => setShowPassword(!showPassword)}
                                    variant="ghost"
                                    colorScheme="teal"
                                >
                                    {showPassword ? 'Cacher' : 'Afficher'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>

                    <FormControl id="confirmPassword" isRequired>
                        <FormLabel fontSize="md">Confirmer le mot de passe</FormLabel>
                        <InputGroup size="lg">
                            <Input
                                type="password"
                                size="lg"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                focusBorderColor="teal.500"
                                borderRadius="md"
                            />
                            <InputRightElement width="4.5rem" mr={1}>
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    variant="ghost"
                                    colorScheme="teal"
                                >
                                    {showConfirmPassword ? 'Cacher' : 'Afficher'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>

                    <Button
                        type="submit"
                        colorScheme="teal"
                        width="full"
                        size="lg"
                        mt={4}
                        borderRadius="md"
                        fontWeight="bold"
                        _hover={{ transform: 'translateY(-2px)' }}
                        transition="all 0.2s"
                    >
                        S'inscrire
                    </Button>

                    <Text textAlign="center" mt={4} color="gray.600">
                        Déjà un compte ?{' '}
                        <Link href="/login" color="teal.600" fontWeight="semibold" textDecoration="underline">
                            Se connecter
                        </Link>
                    </Text>
                </VStack>
            </Box>
        </Box>
    );
};