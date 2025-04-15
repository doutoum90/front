import {
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Switch,
    Button,
    Flex,
    Avatar,
    Input as ChakraInput,
    Tooltip,
    Spinner,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import { FaUserCog, FaShieldAlt, FaBell } from 'react-icons/fa';
import { TabPanelLayout } from '../common/TabPanelLayout';
import { useUserSettings } from '../../hooks/useUserSettings';
import { ChangeEvent } from 'react';

export const Settings = () => {
    const { settings, setSettings, saveSettings, uploadAvatar, loading, error } = useUserSettings();

    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            uploadAvatar(e.target.files[0]);
        }
    };

    if (loading) {
        return (
            <Flex justify="center" align="center" minH="100vh">
                <Spinner size="xl" color="brand.500" />
            </Flex>
        );
    }

    if (error) {
        return (
            <Alert status="error" variant="subtle" flexDirection="column" alignItems="center">
                <AlertIcon boxSize="40px" mr={0} />
                <Heading mt={4} mb={1} fontSize="lg">
                    Erreur lors du chargement des paramètres
                </Heading>
            </Alert>
        );
    }

    const tabs = [
        {
            label: 'Profil',
            icon: FaUserCog,
            tooltip: 'Modifier vos informations personnelles',
            content: (
                <Flex direction="column" gap={6}>
                    <FormControl>
                        <FormLabel>Photo de profil</FormLabel>
                        <Flex align="center" gap={4}>
                            <Avatar size="xl" src={settings.avatar} name={settings.name} />
                            <ChakraInput type="file" accept="image/*" onChange={handleAvatarChange} disabled={loading} />
                        </Flex>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Nom complet</FormLabel>
                        <Input
                            value={settings.name}
                            onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                            placeholder="Jean Dupont"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Prénom</FormLabel>
                        <Input
                            value={settings.lastname}
                            onChange={(e) => setSettings({ ...settings, lastname: e.target.value })}
                            placeholder="Dupont"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Date de naissance</FormLabel>
                        <Input
                            type="date"
                            value={new Date(settings.dateOfBirth).toISOString().split('T')[0]}
                            onChange={(e) => setSettings({ ...settings, dateOfBirth: e.target.value })}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Profession</FormLabel>
                        <Input
                            type="email"
                            value={settings.email}
                            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                            placeholder="contact@exemple.com"
                        />
                    </FormControl>
                    <Tooltip label="Enregistrer les modifications" placement="top">
                        <Button variant="primary" alignSelf="flex-end" onClick={() => saveSettings({})} isLoading={loading}>
                            Enregistrer
                        </Button>
                    </Tooltip>
                </Flex>
            ),
        },
        {
            label: 'Sécurité',
            icon: FaShieldAlt,
            tooltip: 'Gérer les paramètres de sécurité',
            content: (
                <Flex direction="column" gap={6}>
                    <FormControl>
                        <FormLabel>Ancien mot de passe</FormLabel>
                        <Input
                            type="password"
                            value={settings.oldPassword}
                            onChange={(e) => setSettings({ ...settings, oldPassword: e.target.value })}
                            placeholder="Ancien mot de passe"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Nouveau mot de passe</FormLabel>
                        <Input
                            type="password"
                            value={settings.password}
                            onChange={(e) => setSettings({ ...settings, password: e.target.value })}
                            placeholder="Nouveau mot de passe"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
                        <Input
                            type="password"
                            value={settings.confirmPassword}
                            onChange={(e) => setSettings({ ...settings, confirmPassword: e.target.value })}
                            placeholder="Confirmer le nouveau mot de passe"
                        />
                    </FormControl>
                    <Tooltip label="Mettre à jour le mot de passe" placement="top">
                        <Button
                            variant="primary"
                            alignSelf="flex-end"
                            onClick={() => saveSettings({ oldPassword: settings.oldPassword, password: settings.password, confirmPassword: settings.confirmPassword })}
                            isLoading={loading}
                        >
                            Mettre à jour
                        </Button>
                    </Tooltip>
                </Flex>
            ),
        },
        {
            label: 'Notifications',
            icon: FaBell,
            tooltip: 'Gérer vos préférences de notifications',
            content: (
                <Flex direction="column" gap={6}>
                    <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">Notifications Email</FormLabel>
                        <Switch
                            isChecked={settings.emailNotifications}
                            onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                        />
                    </FormControl>
                    <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">Notifications Push</FormLabel>
                        <Switch
                            isChecked={settings.pushNotifications}
                            onChange={(e) => setSettings({ ...settings, pushNotifications: e.target.checked })}
                        />
                    </FormControl>
                    <Tooltip label="Enregistrer les préférences" placement="top">
                        <Button variant="primary" alignSelf="flex-end" isLoading={loading} onClick={() => saveSettings({})}>
                            Enregistrer
                        </Button>
                    </Tooltip>
                </Flex>
            ),
        },
    ];

    return (
        <Box p={8} minH="100vh">
            <Heading size="xl" mb={8}>
                Paramètres du Compte
            </Heading>
            <TabPanelLayout tabs={tabs} />
        </Box>
    );
};

export default Settings;