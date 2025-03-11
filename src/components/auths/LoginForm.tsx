import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
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
    useColorModeValue,
    Spinner
} from '@chakra-ui/react';

export const LoginForm = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const formBg = useColorModeValue('white', 'gray.700');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsFetching(true);
            await login({ email, password });
            setIsFetching(false);
        } catch (err) {
            setError('Identifiants incorrects ou problème de connexion');
            setIsFetching(false);
        }
    };

    return (
        <>
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
                    <VStack spacing={6}>
                        <Heading
                            size="xl"
                            color="teal.600"
                            fontWeight="extrabold"
                            mb={6}
                        >
                            Connectez-vous
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


                        {isFetching ? <Spinner size="xl" color="blue.500" /> : <Button
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
                            Connexion
                        </Button>}

                        <Text textAlign="center" mt={4} color="gray.600">
                            Pas de compte ?{' '}
                            <Link
                                href="/register"
                                color="teal.600"
                                fontWeight="semibold"
                                textDecoration="underline"
                            >
                                Créer un compte
                            </Link>
                        </Text>


                    </VStack>
                </Box>
            </Box>
        </>
    );
};

export default LoginForm;