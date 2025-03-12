import {
    Flex,
    Avatar,
    Heading,
    Text,
    VStack,
    HStack,
    Button,
    Badge,
    Progress,
    Box,
    Divider
} from '@chakra-ui/react';
import { FaEdit, FaLock, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    return (
        <Flex p={8} bg="gray.50" minH="100vh">
            <Box maxW="800px" w="100%" mx="auto">
                <Flex direction={{ base: "column", md: "row" }} gap={8}>
                    {/* Sidebar */}
                    <VStack spacing={6} align="stretch" w={{ md: "250px" }}>
                        <Avatar size="2xl" alignSelf="center" />
                        <Button leftIcon={<FaEdit />} colorScheme="teal" onClick={() => navigate('/espace-membre/settings')}>
                            Modifier le profil
                        </Button>

                        <VStack align="stretch" spacing={4}>
                            <Text fontWeight="bold">Profil complété à 80%</Text>
                            <Progress value={80} size="sm" colorScheme="teal" />
                        </VStack>

                        <Divider />

                        <VStack align="stretch" spacing={3}>
                            <HStack>
                                <FaEnvelope />
                                <Text>{user?.email}</Text>
                            </HStack>
                            <HStack>
                                <FaLock />
                                <Text>••••••••</Text>
                            </HStack>
                            <HStack>
                                <FaCalendarAlt />
                                <Text>Membre depuis 2022</Text>
                            </HStack>
                        </VStack>
                    </VStack>

                    {/* Main Content */}
                    <Box flex={1} bg="white" p={8} borderRadius="xl" boxShadow="md">
                        <Heading size="xl" mb={6}>
                            Jean Dupont
                            <Badge ml={3} colorScheme="teal" fontSize="lg">
                                Pro
                            </Badge>
                        </Heading>

                        <VStack spacing={6} align="stretch">
                            <Box>
                                <Heading size="md" mb={2}>À propos</Heading>
                                <Text color="gray.600">
                                    Responsable marketing digital passionné par l'analyse de données
                                    et l'optimisation des performances.
                                </Text>
                            </Box>

                            <Box>
                                <Heading size="md" mb={2}>Compétences</Heading>
                                <Flex wrap="wrap" gap={2}>
                                    {['Marketing Digital', 'Analyse de données', 'SEO', 'Google Analytics'].map((skill) => (
                                        <Badge key={skill} colorScheme="teal" px={3} py={1}>
                                            {skill}
                                        </Badge>
                                    ))}
                                </Flex>
                            </Box>

                            <Box>
                                <Heading size="md" mb={2}>Dernières activités</Heading>
                                <VStack spacing={3} align="stretch">
                                    <Text>• Configuration du tracking analytics (il y a 2h)</Text>
                                    <Text>• Mise à jour des informations de paiement (il y a 1j)</Text>
                                    <Text>• Téléchargement du rapport mensuel (il y a 3j)</Text>
                                </VStack>
                            </Box>
                        </VStack>
                    </Box>
                </Flex>
            </Box>
        </Flex>
    );
};

export default Profile;