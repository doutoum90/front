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
    Divider,
} from '@chakra-ui/react';
import { FaEdit, FaLock, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import { useProfile } from '../../hooks/useProfile';
import { useProfileStyles } from '../../hooks/useProfileStyles';

export const Profile = () => {
    const { user, formatDate, handleEditProfile } = useProfile();
    const styles = useProfileStyles();

    return (
        <Flex p={8} bg={styles.pageBg} minH="100vh">
            <Box maxW="800px" w="100%" mx="auto">
                <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
                    <VStack spacing={6} align="stretch" w={{ md: '250px' }}>
                        <Avatar size="2xl" alignSelf="center" />
                        <Button
                            leftIcon={<FaEdit />}
                            onClick={handleEditProfile}
                        >
                            Modifier le profil
                        </Button>

                        <VStack align="stretch" spacing={4}>
                            <Text fontWeight="bold" color={styles.textPrimary}>
                                Profil complété à 80%
                            </Text>
                            <Progress value={80} size="sm" colorScheme={styles.progressColorScheme} />
                        </VStack>

                        <Divider />

                        <VStack align="stretch" spacing={3}>
                            <HStack>
                                <FaEnvelope color={styles.textSecondary} />
                                <Text color={styles.textSecondary}>{user?.email}</Text>
                            </HStack>
                            <HStack>
                                <FaLock color={styles.textSecondary} />
                                <Text color={styles.textSecondary}>••••••••</Text>
                            </HStack>
                            <HStack>
                                <FaCalendarAlt color={styles.textSecondary} />
                                <Text color={styles.textSecondary}>{formatDate(user?.createdAt)}</Text>
                            </HStack>
                        </VStack>
                    </VStack>

                    <Box
                        flex={1}
                        bg={styles.cardBg}
                        p={8}
                        borderRadius={styles.borderRadius}
                        boxShadow={styles.boxShadow}
                    >
                        <Heading size="sm" mb={6} color={styles.textPrimary}>
                            {user?.name} {user?.lastname}
                        </Heading>

                        <VStack spacing={6} align="stretch">
                            <Box>
                                <Heading size="md" mb={2} color={styles.textPrimary}>
                                    À propos
                                </Heading>
                                <Text color={styles.textSecondary}>{user?.profession}</Text>
                            </Box>

                            <Box>
                                <Heading size="md" mb={2} color={styles.textPrimary}>
                                    Type d'abonnement
                                </Heading>
                                <Flex wrap="wrap" gap={2}>
                                    {user?.typeAbonnement && (
                                        <Badge
                                            key={user.typeAbonnement}
                                            colorScheme={styles.badgeColorScheme}
                                            px={3}
                                            py={1}
                                        >
                                            {user.typeAbonnement}
                                        </Badge>
                                    )}
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