import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  VStack,
  Alert,
  AlertIcon,
  useColorModeValue,
  Spinner
} from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';

export const PasswordReset = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const formBg = useColorModeValue('white', 'gray.700');
  const [isFetching, setIsFetching] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsFetching(true);
      await resetPassword(email);
      setSuccess(true);
      setIsFetching(false);
    } catch (err) {
      setError('Une erreur est survenue lors de la réinitialisation');
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
          <VStack spacing={6} align="stretch">
            <Heading size="xl" color="teal.600" fontWeight="extrabold" mb={6}>
              Mot de passe oublié
            </Heading>

            {error && (
              <Alert status="error" borderRadius="md" variant="subtle">
                <AlertIcon />
                {error}
              </Alert>
            )}

            {success ? (
              <Alert status="success" borderRadius="md" variant="subtle">
                <AlertIcon />
                Un email de réinitialisation a été envoyé !
              </Alert>
            ) : (
              <>
                <Text color="gray.600" mb={4}>
                  Entrez votre email pour réinitialiser votre mot de passe
                </Text>

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
                  Envoyer
                </Button>}

              </>
            )}

            <Text textAlign="center" mt={4} color="gray.600">
              <Link href="/login" color="teal.600" fontWeight="semibold" textDecoration="underline">
                Retour à la connexion
              </Link>
            </Text>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default PasswordReset;