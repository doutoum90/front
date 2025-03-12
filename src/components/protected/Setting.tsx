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
    Flex
} from '@chakra-ui/react';
import { FaUserCog, FaShieldAlt, FaBell } from 'react-icons/fa';

export const Settings = () => {
    return (
        <Box p={8} bg="gray.50" minH="100vh">
            <Heading size="xl" mb={8} color="teal.600">
                Paramètres du Compte
            </Heading>

            <Tabs variant="enclosed">
                <TabList>
                    <Tab><FaUserCog />&nbsp;Profil</Tab>
                    <Tab><FaShieldAlt />&nbsp;Sécurité</Tab>
                    <Tab><FaBell />&nbsp;Notifications</Tab>
                </TabList>

                <TabPanels mt={6}>
                    <TabPanel>
                        <VStack spacing={6} maxW="600px">
                            <FormControl>
                                <FormLabel>Photo de profil</FormLabel>
                                <Flex align="center">
                                    <Avatar size="xl" mr={4} />
                                    <Button variant="outline">Changer</Button>
                                </Flex>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Nom complet</FormLabel>
                                <Input placeholder="Jean Dupont" />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" placeholder="contact@exemple.com" />
                            </FormControl>

                            <Button colorScheme="teal" alignSelf="flex-end">
                                Enregistrer
                            </Button>
                        </VStack>
                    </TabPanel>

                    <TabPanel>
                        <VStack spacing={6} maxW="600px">
                            <FormControl>
                                <FormLabel>Changer le mot de passe</FormLabel>
                                <Input type="password" placeholder="Nouveau mot de passe" />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Authentification à 2 facteurs</FormLabel>
                                <Switch colorScheme="teal" />
                            </FormControl>

                            <Button colorScheme="teal" alignSelf="flex-end">
                                Mettre à jour
                            </Button>
                        </VStack>
                    </TabPanel>

                    <TabPanel>
                        <VStack spacing={6} maxW="600px">
                            <FormControl>
                                <FormLabel>Notifications Email</FormLabel>
                                <Switch colorScheme="teal" defaultChecked />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Notifications Push</FormLabel>
                                <Switch colorScheme="teal" />
                            </FormControl>

                            <Button colorScheme="teal" alignSelf="flex-end">
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