import {
    Box,
    VStack,
    Button,
    Icon,
    Divider,
    Flex,
    Text,
    IconButton,
    useColorMode,
    Center,
    Tooltip,
} from '@chakra-ui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, MenuButton, MenuList, MenuItem, MenuDivider, Avatar } from '@chakra-ui/react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { PROTECTED_MENU } from '../../../constantes';
import { useAuth } from '../../../contexts/AuthContext';

export const SideMenu = () => {
    const location = useLocation();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Box
            as="nav"
            position="fixed"
            top="0"
            left="0"
            width="250px"
            height="100vh"
            bg="chakra-body-bg"
            boxShadow="md"
            p={4}
            zIndex="sticky"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
        >
            <VStack align="center" spacing={2} width="100%">
                {PROTECTED_MENU.map((item) => (
                    <Tooltip key={item.path} label={item.name} placement="right">
                        <Button
                            as={Link}
                            to={item.path}
                            variant={location.pathname === item.path ? 'solid' : 'ghost'}
                            colorScheme="brand"
                            aria-current={location.pathname === item.path ? 'page' : undefined}
                            width="100%"
                            maxWidth="200px"
                            justifyContent="center"
                            leftIcon={<Icon as={item.icon || 'span'} />}
                            _hover={{ bg: location.pathname === item.path ? undefined : 'chakra-subtle-bg' }}
                            whiteSpace="pre-line"
                        >
                            {item.name}
                        </Button>
                    </Tooltip>
                ))}
            </VStack>

            <Center flexDirection="column" gap={4}>
                <Divider />
                <Tooltip label={`Passer au mode ${colorMode === 'light' ? 'sombre' : 'clair'}`} placement="right">
                    <IconButton
                        icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
                        onClick={toggleColorMode}
                        aria-label="Toggle theme"
                        variant="ghost"
                        w="full"
                        _hover={{ bg: 'chakra-subtle-bg' }}
                    />
                </Tooltip>
                <Divider />

                <Menu>
                    <Center>
                        <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
                            <Avatar size="md" name={user?.email} bg="brand.500" color="white" />
                        </MenuButton>
                        <MenuList py={2} minW="200px">
                            <MenuItem>
                                <Flex direction="column" px={2}>
                                    <Text fontWeight="semibold">{user?.email}</Text>
                                    <Text fontSize="sm" color="chakra-subtle-text">
                                        Profil
                                    </Text>
                                </Flex>
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={() => navigate('/espace-membre/profile')}>
                                <Icon as={() => <span className="material-icons">person</span>} mr={2} />
                                Mon Profil
                            </MenuItem>
                            <MenuItem onClick={() => navigate('/espace-membre/settings')}>
                                <Icon as={() => <span className="material-icons">settings</span>} mr={2} />
                                Paramètres
                            </MenuItem>
                            <MenuItem onClick={() => navigate('/espace-membre/suivi-payment')}>
                                <Icon as={() => <span className="material-icons">settings</span>} mr={2} />
                                Suivi Paiement
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={logout} color="red.600">
                                <Icon as={() => <span className="material-icons">logout</span>} mr={2} />
                                Déconnexion
                            </MenuItem>
                        </MenuList>
                    </Center>
                </Menu>
            </Center>
        </Box>
    );
};

export default SideMenu;