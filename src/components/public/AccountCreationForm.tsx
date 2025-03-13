import { useState } from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  InputGroup,
  InputRightElement,
  Box,
  Text,
  List,
  ListItem
} from '@chakra-ui/react';
import { UserData } from '../../types';


interface AccountCreationFormProps {
  onSuccess: (userData: UserData) => void;
  showPasswordPolicy?: boolean;
  ctaText?: string;
}

export const AccountCreationForm = ({ onSuccess,
  showPasswordPolicy = false,
  ctaText = 'Créer mon compte'
}: AccountCreationFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.lastname || !formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (formData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    onSuccess({
      name: formData.name,
      lastname: formData.lastname,
      email: formData.email,
      password: formData.password
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={4}>
        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}

        <FormControl isRequired>
          <FormLabel>Prénom</FormLabel>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Jean"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Nom</FormLabel>
          <Input
            value={formData.lastname}
            onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
            placeholder="Dupont"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="jean.dupont@email.com"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Mot de passe</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                variant="ghost"
              >
                {showPassword ? 'Cacher' : 'Afficher'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        {showPasswordPolicy && (
          <Box textAlign="left" w="full" fontSize="sm" color="gray.600">
            <Text>Le mot de passe doit contenir :</Text>
            <List spacing={1}>
              <ListItem>✓ Minimum 8 caractères</ListItem>
              <ListItem>✓ 1 chiffre minimum</ListItem>
              <ListItem>✓ 1 caractère spécial</ListItem>
            </List>
          </Box>
        )}

        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          width="full"
          mt={4}
        >
          {ctaText}
        </Button>
      </VStack>
    </Box>
  );
};