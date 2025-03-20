import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    FormControl,
    FormLabel,
    Input,
    Switch,
    Button,
    VStack,
    Avatar,
    Box,
    Heading,
    Flex,
    useToast,
    useColorModeValue,
} from '@chakra-ui/react';
import { FaUserCog, FaShieldAlt, FaBell } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const Settings = () => {
    const { user, refreshUser } = useAuth();
    const toast = useToast();
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const headingColor = useColorModeValue('teal.600', 'teal.200');
    const [settings, setSettings] = useState({
        email: '',
        password: '',
        name: '',
        emailNotifications: true,
        pushNotifications: false,
        twoFactorAuth: false,
    });
    const [loading, setLoading] = useState(false);

    // Charger les données utilisateur au montage
    useEffect(() => {
        if (user) {
            setSettings({
                email: user.email || '',
                name: user.name || '',
                password: '',
                emailNotifications: true, // Valeur par défaut ou récupérée
                pushNotifications: false, // Valeur par défaut ou récupérée
                twoFactorAuth: false, // À implémenter côté backend si nécessaire
            });
        }
    }, [user]);

    const saveSettings = async () => {
        setLoading(true);
        const accessToken = localStorage.getItem('access_token'); // Utiliser access_token, pas refresh_token
        try {
            const response = await fetch('/api/settings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    email: settings.email,
                    name: settings.name,
                    password: settings.password || undefined, // Ne pas envoyer si vide
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erreur lors de la mise à jour');
            }

            await refreshUser(); // Rafraîchir les données utilisateur dans AuthContext
            toast({
                title: 'Paramètres mis à jour',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error: any) {
            console.error('Erreur lors de la sauvegarde des paramètres :', error);
            toast({
                title: 'Erreur',
                description: error.message || 'Échec de la mise à jour',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box p={8} bg={bgColor} minH="100vh">
            <Heading size="xl" mb={8} color={headingColor}>
                Paramètres du Compte
            </Heading>

            <Tabs variant="enclosed" colorScheme='teal' isFitted>
                <TabList borderColor={useColorModeValue('gray.200', 'gray.600')}>
                    <Tab
                        _selected={{
                            color: headingColor,
                            borderColor: 'currentColor'
                        }}
                    >
                        <FaUserCog /> Profil
                    </Tab>
                    <Tab>
                        <FaShieldAlt /> Sécurité
                    </Tab>
                    <Tab>
                        <FaBell /> Notifications
                    </Tab>
                </TabList>

                <TabPanels mt={6}>
                    {/* Onglet Profil */}
                    <TabPanel>
                        <VStack spacing={6} maxW="600px">
                            <FormControl>
                                <FormLabel>Photo de profil</FormLabel>
                                <Flex align="center">
                                    <Avatar size="xl" name={settings.name} mr={4} />
                                    <Button variant="outline" isDisabled>
                                        Changer (non implémenté)
                                    </Button>
                                </Flex>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Nom complet</FormLabel>
                                <Input
                                    bg={useColorModeValue('white', 'gray.700')}
                                    color={useColorModeValue('gray.800', 'white')}
                                    borderColor={useColorModeValue('gray.300', 'gray.600')}
                                    value={settings.name}
                                    onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                                    placeholder="Jean Dupont"
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    bg={useColorModeValue('white', 'gray.700')}
                                    color={useColorModeValue('gray.800', 'white')}
                                    borderColor={useColorModeValue('gray.300', 'gray.600')}
                                    type="email"
                                    value={settings.email}
                                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                    placeholder="contact@exemple.com"
                                />
                            </FormControl>

                            <Button
                                colorScheme="teal"
                                alignSelf="flex-end"
                                onClick={saveSettings}
                                isLoading={loading}
                            >
                                Enregistrer
                            </Button>
                        </VStack>
                    </TabPanel>

                    {/* Onglet Sécurité */}
                    <TabPanel>
                        <VStack spacing={6} maxW="600px">
                            <FormControl>
                                <FormLabel>Changer le mot de passe</FormLabel>
                                <Input
                                    bg={useColorModeValue('white', 'gray.700')}
                                    color={useColorModeValue('gray.800', 'white')}
                                    borderColor={useColorModeValue('gray.300', 'gray.600')}
                                    type="password"
                                    value={settings.password}
                                    onChange={(e) => setSettings({ ...settings, password: e.target.value })}
                                    placeholder="Nouveau mot de passe"
                                />
                            </FormControl>

                            <FormControl display="flex" alignItems="center">
                                <FormLabel mb="0">Authentification à 2 facteurs</FormLabel>
                                <Switch
                                    colorScheme="teal"
                                    isChecked={settings.twoFactorAuth}
                                    onChange={(e) => setSettings({ ...settings, twoFactorAuth: e.target.checked })}
                                    isDisabled // À activer avec une implémentation backend
                                />
                            </FormControl>

                            <Button
                                colorScheme="teal"
                                alignSelf="flex-end"
                                onClick={saveSettings}
                                isLoading={loading}
                            >
                                Mettre à jour
                            </Button>
                        </VStack>
                    </TabPanel>

                    {/* Onglet Notifications */}
                    <TabPanel>
                        <VStack spacing={6} maxW="600px">
                            <FormControl display="flex" alignItems="center">
                                <FormLabel mb="0">Notifications Email</FormLabel>
                                <Switch
                                    colorScheme="teal"
                                    isChecked={settings.emailNotifications}
                                    onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                                />
                            </FormControl>

                            <FormControl display="flex" alignItems="center">
                                <FormLabel mb="0">Notifications Push</FormLabel>
                                <Switch
                                    colorScheme="teal"
                                    isChecked={settings.pushNotifications}
                                    onChange={(e) => setSettings({ ...settings, pushNotifications: e.target.checked })}
                                />
                            </FormControl>

                            <Button colorScheme="teal" alignSelf="flex-end" isLoading={loading}>
                                Enregistrer
                            </Button>
                        </VStack>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default Settings;