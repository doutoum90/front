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
    const formatedDate = (createdAt?: string) => createdAt ? `Membre depuis ${new Date(createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}` : '';
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
                                <Text> {formatedDate(user?.createdAt)}</Text>
                            </HStack>
                        </VStack>
                    </VStack>

                    {/* Main Content */}
                    <Box flex={1} bg="white" p={8} borderRadius="xl" boxShadow="md">
                        <Heading size="sm" mb={6}>
                            {user?.name} {user?.lastname}
                        </Heading>

                        <VStack spacing={6} align="stretch">
                            <Box>
                                <Heading size="md" mb={2}>À propos</Heading>
                                <Text color="gray.600">
                                    {user?.profession}
                                </Text>
                            </Box>

                            <Box>
                                <Heading size="md" mb={2}>Compétences</Heading>
                                <Flex wrap="wrap" gap={2}>
                                    {user?.skills?.map((skill) => (
                                        <Badge key={skill} colorScheme="teal" px={3} py={1}>
                                            {skill} ejekek
                                        </Badge>
                                    ))}
                                </Flex>
                            </Box>
                            <Box>
                                <Heading size="md" mb={2}>Type d'abonnement</Heading>
                                <Flex wrap="wrap" gap={2}>
                                    {user?.typeAbonnement?.map((type) => (
                                        <Badge key={type} colorScheme="teal" px={3} py={1}>
                                            {type}
                                        </Badge>
                                    ))}
                                </Flex>
                            </Box>
                        </VStack>
                    </Box>
                </Flex>
            </Box>
        </Flex>
    );
};

export default Profile;