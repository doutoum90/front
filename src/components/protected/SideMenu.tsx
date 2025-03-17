import { Box, VStack, Button, Icon, useColorModeValue, Divider, Flex, Text, IconButton, useColorMode, Center } from '@chakra-ui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PROTECTED_MENU } from '../../constantes';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, MenuButton, MenuList, MenuItem, MenuDivider, Avatar } from '@chakra-ui/react';
import { FiSun } from 'react-icons/fi';
import { FiMoon } from 'react-icons/fi';

export const SideMenu = () => {
    const location = useLocation();
    const { user } = useAuth();
    const navigate = useNavigate();

    const { logout } = useAuth();
    const bg = useColorModeValue('white', 'gray.900');
    const hoverBg = useColorModeValue('gray.100', 'gray.700');
    const activeBg = useColorModeValue('teal.50', 'teal.700');
    const activeColor = useColorModeValue('teal.600', 'teal.200');
    const { colorMode, toggleColorMode } = useColorMode();
    const menuBg = useColorModeValue('white', 'gray.800');
    const menuBorder = useColorModeValue('gray.200', 'gray.700');

    return (
        <Box
            as="nav"
            position="fixed"
            top="0"
            left="0"
            width="250px"
            height="100vh"
            bg={bg}
            boxShadow="md"
            p={4}
            zIndex="sticky"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
        >
            <VStack
                align="center"
                spacing={2}
                width="100%"
            >
                {PROTECTED_MENU.map((item) => (
                    <Button
                        as={Link}
                        to={item.path}
                        key={item.path}
                        variant={location.pathname === item.path ? 'solid' : 'ghost'}
                        colorScheme="teal"
                        aria-current={location.pathname === item.path ? 'page' : undefined}
                        bg={location.pathname === item.path ? activeBg : 'transparent'}
                        color={location.pathname === item.path ? activeColor : 'inherit'}
                        borderBottom={location.pathname === item.path ? '2px solid' : 'none'}
                        borderColor="teal.500"
                        width="100%"
                        maxWidth="200px"
                        justifyContent="center"
                        leftIcon={<Icon as={item.icon || 'span'} />}
                        _hover={{ bg: hoverBg }}
                        whiteSpace="pre-line"
                    >
                        {item.name}
                    </Button>
                ))}
            </VStack>
            <Center flexDirection="column" gap={4}>
                <Divider mt={4} />
                <IconButton
                    icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
                    onClick={toggleColorMode}
                    aria-label="Toggle theme"
                    variant="ghost"
                    w="full"
                    _hover={{ bg: hoverBg }}
                />
                <Divider mt={4} />

                <Menu >
                    <Center>
                        <MenuButton
                            as={Button}
                            rounded="full"
                            variant="link"
                            cursor="pointer"
                            minW={0}
                        >
                            <Avatar
                                size="md"
                                name={user?.email}
                                src="https://bit.ly/broken-link"
                                bg="teal.500"
                                color="white"
                            />
                        </MenuButton>
                        <MenuList bg={menuBg} borderColor={menuBorder} py={2} minW="200px">
                            <MenuItem _hover={{ bg: 'teal.50' }} _focus={{ bg: 'teal.50' }}>
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
                    </Center>
                </Menu>
            </Center>
        </Box>
    );
};

export default SideMenu;