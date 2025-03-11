import {
    Box,
    Flex,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Text,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const PrivateHeader = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const menuBg = useColorModeValue('white', 'gray.800');
    const menuBorder = useColorModeValue('gray.200', 'gray.700');

    return (
        <Box
            bg={useColorModeValue('white', 'gray.900')}
            px={4}
            py={3}
            boxShadow="sm"
            position="sticky"
            top={0}
            zIndex="sticky"
        >
            <Flex alignItems="center" justifyContent="space-between" maxW="container.xl" mx="auto">
                {/* Logo */}
                <Link to="/">
                    <Text fontSize="2xl" fontWeight="bold" color="teal.600">
                        MyApp
                    </Text>
                </Link>

                {/* Menu Navigation */}
                <Flex alignItems="center" gap={6}>
                    <Link to="/dashboard">
                        <Button variant="ghost" colorScheme="teal">
                            Dashboard
                        </Button>
                    </Link>

                    {/* Menu Utilisateur */}
                    <Menu>
                        <MenuButton
                            as={Button}
                            rounded="full"
                            variant="link"
                            cursor="pointer"
                            minW={0}
                        >
                            <Avatar
                                size="sm"
                                name={user?.email}
                                src="https://bit.ly/broken-link" // Remplacez par l'URL de l'avatar utilisateur
                                bg="teal.500"
                                color="white"
                            />
                        </MenuButton>
                        <MenuList
                            bg={menuBg}
                            borderColor={menuBorder}
                            py={2}
                            minW="200px"
                        >
                            <MenuItem
                                _hover={{ bg: 'teal.50' }}
                                _focus={{ bg: 'teal.50' }}
                            >
                                <Flex direction="column" px={2}>
                                    <Text fontWeight="semibold">{user?.email}</Text>
                                    <Text fontSize="sm" color="gray.500">Profil</Text>
                                </Flex>
                            </MenuItem>
                            <MenuDivider />

                            <MenuItem
                                icon={<Box as="span" className="material-icons">person</Box>}
                                _hover={{ bg: 'teal.50' }}
                                onClick={() => navigate('/espace-membre/profile')}
                            >
                                Mon Profil
                            </MenuItem>

                            <MenuItem
                                icon={<Box as="span" className="material-icons">settings</Box>}
                                _hover={{ bg: 'teal.50' }}
                                onClick={() => navigate('/espace-membre/settings')}
                            >
                                Paramètres
                            </MenuItem>

                            <MenuDivider />

                            <MenuItem
                                icon={<Box as="span" className="material-icons">logout</Box>}
                                _hover={{ bg: 'red.50' }}
                                onClick={logout}
                                color="red.600"
                            >
                                Déconnexion
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
        </Box>
    );
};

export default PrivateHeader;