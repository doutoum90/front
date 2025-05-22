import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AdminUser } from '../../types';
import { AUTH_FORM_COLORS as COLORS } from '../../constantes';
import { registerAdminUser } from '../../services/authAdminService';

const schema = yup.object().shape({
  firstName: yup.string().required('Le prénom est obligatoire'),
  lastName: yup.string().required('Le nom est obligatoire'),
  email: yup.string().email('Email invalide').required('L\'email est obligatoire'),
  password: yup.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .required('Le mot de passe est obligatoire'),
});

export default function Register() {
  const toast = useToast();
  const navigate = useNavigate();
  const formBg = useColorModeValue(COLORS.formBgLight, COLORS.formBgDark);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminUser>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: AdminUser) => {
    try {
      setIsSubmitting(true);
      await registerAdminUser(data);

      toast({
        title: 'Inscription réussie',
        description: 'Le compte admin a été créé avec succès',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      navigate('/admin/dashboard');
    } catch (error: { response?: { data?: { message: string } } }) {
      toast({
        title: 'Erreur d\'inscription',
        description: error.response?.data?.message || 'Une erreur est survenue',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
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
        onSubmit={handleSubmit(onSubmit)}
        bg={formBg}
        p={8}
        borderRadius="xl"
        boxShadow="2xl"
        width="100%"
        maxW="md"
        textAlign="center"
      >
        <VStack spacing={6}>
          <Heading as="h1" mb={8} textAlign="center" fontSize="2xl">
            Créer un compte Admin
          </Heading>

          <Stack spacing={4}>
            <FormControl isInvalid={!!errors.firstName}>
              <FormLabel>Prénom</FormLabel>
              <Input
                type="text"
                {...register('firstName')}
                placeholder="Entrez votre prénom"
              />
              <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.lastName}>
              <FormLabel>Nom</FormLabel>
              <Input
                type="text"
                {...register('lastName')}
                placeholder="Entrez votre nom"
              />
              <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                {...register('email')}
                placeholder="Entrez votre email"
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <FormLabel>Mot de passe</FormLabel>
              <Input
                type="password"
                {...register('password')}
                placeholder="••••••••"
              />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              isLoading={isSubmitting}
              loadingText="Enregistrement..."
            >
              Créer le compte
            </Button>
          </Stack>
        </VStack>
      </Box>
    </Box>
  );
}