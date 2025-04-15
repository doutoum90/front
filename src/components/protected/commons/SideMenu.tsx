import {
    Box,
    VStack,
    Button,
    Icon,
    Divider,
    Flex,
    Text,
    IconButton,
    Center,
    Tooltip,
} from '@chakra-ui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, MenuButton, MenuList, MenuItem, MenuDivider, Avatar } from '@chakra-ui/react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { PROTECTED_MENU } from '../../../constantes';
import { useAuth } from '../../../contexts/AuthContext';
import { useTheme } from '../../../hooks/useTheme';

export const SideMenu = () => {
    const location = useLocation();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { colorMode, toggleColorMode, colors } = useTheme();

    return (
        <Box
            as="nav"
            position="fixed"
            top="0"
            left="0"
            width="250px"
            height="100vh"
            bg={colors.background}
            boxShadow="md"
            p={4}
            zIndex="sticky"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            borderRight="1px"
            borderColor={colors.border}
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
                            leftIcon={<Icon as={item.icon || 'span'} color={colors.icon} />}
                            _hover={{ bg: colors.hover }}
                            whiteSpace="pre-line"
                        >
                            {item.name}
                        </Button>
                    </Tooltip>
                ))}
            </VStack>

            <Center flexDirection="column" gap={4}>
                <Divider borderColor={colors.border} />
                <Tooltip label={`Passer au mode ${colorMode === 'light' ? 'sombre' : 'clair'}`} placement="right">
                    <IconButton
                        icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
                        onClick={toggleColorMode}
                        aria-label="Toggle theme"
                        variant="ghost"
                        w="full"
                        color={colors.icon}
                        _hover={{ bg: colors.hover }}
                    />
                </Tooltip>
                <Divider borderColor={colors.border} />

                <Menu>
                    <Center>
                        <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
                            <Avatar size="md" name={user?.email} bg="brand.500" color="white" />
                        </MenuButton>
                        <MenuList py={2} minW="200px" bg={colors.background} borderColor={colors.border}>
                            <MenuItem _hover={{ bg: colors.hover }}>
                                <Flex direction="column" px={2}>
                                    <Text fontWeight="semibold" color={colors.text}>{user?.email}</Text>
                                    <Text fontSize="sm" color={colors.subtle}>
                                        Profil
                                    </Text>
                                </Flex>
                            </MenuItem>
                            <MenuDivider borderColor={colors.border} />
                            <MenuItem onClick={() => navigate('/espace-membre/profile')} _hover={{ bg: colors.hover }}>
                                <Icon as={() => <span className="material-icons">person</span>} mr={2} color={colors.icon} />
                                Mon Profil
                            </MenuItem>
                            <MenuItem onClick={() => navigate('/espace-membre/settings')} _hover={{ bg: colors.hover }}>
                                <Icon as={() => <span className="material-icons">settings</span>} mr={2} color={colors.icon} />
                                Paramètres
                            </MenuItem>
                            <MenuItem onClick={() => navigate('/espace-membre/suivi-payment')} _hover={{ bg: colors.hover }}>
                                <Icon as={() => <span className="material-icons">settings</span>} mr={2} color={colors.icon} />
                                Suivi Paiement
                            </MenuItem>
                            <MenuDivider borderColor={colors.border} />
                            <MenuItem onClick={logout} color="red.600" _hover={{ bg: colors.hover }}>
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