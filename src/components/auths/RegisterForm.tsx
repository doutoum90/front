import { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    VStack,
    Alert,
    AlertIcon,
    useColorModeValue,
    Spinner,
    Link,
    SimpleGrid,
    Text,
    InputRightElement,
    InputGroup
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface FormData {
    name: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
    dateOfBirth: string;
    profession: string;
    skills?: string[];
    typeAbonnement?: string[];
}

export const RegisterForm = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: '',
        profession: '',
        skills: [],
        typeAbonnement: []
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formBg = useColorModeValue('white', 'gray.700');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            skills: e.target.value.split(',').map(skill => skill.trim())
        });
    };

    const validateStep = () => {
        if (step === 1) {
            if (!formData.name || !formData.lastname || !formData.email || !formData.password || !formData.confirmPassword) {
                setError('Veuillez remplir tous les champs obligatoires');
                return false;
            } else if (formData.password !== formData.confirmPassword) {
                setError('Les mots de passe ne correspondent pas');
                return false;
            }
        }
        if (step === 2 && (!formData.dateOfBirth || !formData.profession)) {
            setError('Veuillez remplir tous les champs obligatoires');
            return false;
        }
        setError('');
        return true;
    };

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateStep()) {
            setStep(step + 1);
        }
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateStep()) return;
        try {
            setIsSubmitting(true);
            await register(formData);
            setIsSubmitting(false);
            navigate('/auth/login');
        } catch (err) {
            setError('Une erreur est survenue lors de l\'inscription');
            setIsSubmitting(false);
        }
    };

    const renderProgress = () => (
        <SimpleGrid columns={2} spacing={4} mb={8}>
            {[1, 2].map((num) => (
                <Box
                    key={num}
                    h="2"
                    bg={num <= step ? 'teal.500' : 'gray.200'}
                    borderRadius="full"
                    transition="all 0.3s"
                />
            ))}
        </SimpleGrid>
    );

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
                onSubmit={step < 2 ? handleNext : handleSubmit}
                bg={formBg}
                p={8}
                borderRadius="xl"
                boxShadow="2xl"
                width="100%"
                maxW="md"
                textAlign="center"
            >
                <VStack spacing={6} align="stretch">
                    <Heading
                        size="xl"
                        color="teal.600"
                        fontWeight="extrabold"
                        mb={6}
                        textAlign="center"
                    >
                        Souscription
                    </Heading>

                    {renderProgress()}

                    {error && (
                        <Alert status="error" borderRadius="md" variant="subtle" mb={6}>
                            <AlertIcon />
                            {error}
                        </Alert>
                    )}

                    {step === 1 && (
                        <VStack spacing={4}>
                            <FormControl id="name" isRequired>
                                <FormLabel>Nom</FormLabel>
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Votre nom"
                                />
                            </FormControl>

                            <FormControl id="lastname" isRequired>
                                <FormLabel>Prénom</FormLabel>
                                <Input
                                    name="lastname"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    placeholder="Votre prénom"
                                />
                            </FormControl>

                            <FormControl id="email" isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="votre@email.com"
                                />
                            </FormControl>

                            <FormControl id="password" isRequired>
                                <FormLabel fontSize="md">Mot de passe</FormLabel>
                                <InputGroup size="lg">
                                    <Input
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={handleChange}
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
                                        name="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        size="lg"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
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
                        </VStack>
                    )}

                    {step === 2 && (
                        <VStack spacing={4}>
                            <FormControl id="dateOfBirth" isRequired>
                                <FormLabel>Date de naissance</FormLabel>
                                <Input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth || ''}
                                    onChange={handleChange}
                                />
                            </FormControl>

                            <FormControl id="profession" isRequired>
                                <FormLabel>Profession</FormLabel>
                                <Input
                                    name="profession"
                                    value={formData.profession || ''}
                                    onChange={handleChange}
                                    placeholder="Votre métier"
                                />
                            </FormControl>

                            <FormControl id="skills">
                                <FormLabel>Compétences (séparées par des virgules)</FormLabel>
                                <Input
                                    name="skills"
                                    value={formData.skills?.join(', ') || ''}
                                    onChange={handleSkillsChange}
                                    placeholder="Ex: React, Node.js, Design"
                                />
                            </FormControl>
                        </VStack>
                    )}


                    <SimpleGrid columns={2} spacing={4} mt={8}>
                        {step > 1 && (
                            <Button
                                onClick={handlePrevious}
                                colorScheme="gray"
                                variant="outline"
                            >
                                Retour
                            </Button>
                        )}

                        <Button
                            type="submit"
                            colorScheme="teal"
                            isLoading={isSubmitting}
                            loadingText="Envoi..."
                            spinner={<Spinner size="sm" />}
                        >
                            {step < 2 ? 'Suivant' : 'Souscrire'}
                        </Button>


                    </SimpleGrid>
                    <Text textAlign="center" mt={4} color="gray.600">
                        Déjà un compte ?{' '}
                        <Link href="/auth/login" color="teal.600" fontWeight="semibold" textDecoration="underline">
                            Se connecter
                        </Link>
                    </Text>
                </VStack>
            </Box>
        </Box>
    );
};

export default RegisterForm;