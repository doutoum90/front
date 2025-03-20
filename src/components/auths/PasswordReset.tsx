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
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react';
import { usePasswordReset } from '../../hooks/usePasswordReset';
import { AUTH_FORM_COLORS as COLORS } from '../../constantes';

export const PasswordReset = () => {
  const { email, setEmail, error, success, isFetching, handleSubmit } = usePasswordReset();
  const formBg = useColorModeValue(COLORS.formBgLight, COLORS.formBgDark);

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
          <Heading size="xl" color={COLORS.heading} fontWeight="extrabold" mb={6}>
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
              <Text color={COLORS.text} mb={4}>
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
                  focusBorderColor={COLORS.focusBorder}
                  borderRadius="md"
                />
              </FormControl>

              {isFetching ? (
                <Spinner size="xl" color={COLORS.spinner} />
              ) : (
                <Button
                  type="submit"
                  colorScheme="teal"
                  width="full"
                  size="lg"
                  mt={4}
                  borderRadius="md"
                  fontWeight="bold"
                  _hover={COLORS.buttonHover}
                  transition="all 0.2s"
                >
                  Envoyer
                </Button>
              )}
            </>
          )}

          <Text textAlign="center" mt={4} color={COLORS.text}>
            <Link href="/auth/login" color={COLORS.link} fontWeight="semibold" textDecoration="underline">
              Retour à la connexion
            </Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default PasswordReset;