import { Flex, Button, Box, HStack, VStack, Image } from "@chakra-ui/react";
import { usePublicHeader } from "../../hooks/usePublicHeader";

export const PublicHeader = () => {
    const { menuItems, isActiveRoute, handleNavigate, handleLogoClick, handleClientSpace } = usePublicHeader();

    return (
        <Box maxW="100%" m={0} p={0}>
            <HStack
                spacing={0}
                borderRadius="xl"
                width="100%"
                align="stretch"
            >
                <VStack
                    width="30%"
                    alignItems="flex-start"
                    pr={4}
                >
                    <Image src="/logo-sm.jpg" alt="logo" cursor="pointer" onClick={handleLogoClick} />
                </VStack>
                <VStack
                    width="70%"
                    bg="#3d84a8" // Primary blue (already matches palette)
                    justifyContent="center"
                    pr={0}
                    mr={0}
                >
                    <Flex width="100%" justifyContent="flex-end" pt={8} pr={8}>
                        <Button
                            onClick={handleClientSpace}
                            mr={8}
                            variant="outline"
                            color="#7cb3cf" // Muted blue (already matches palette)
                            bg="#ffffff" // White (already matches palette)
                            borderColor="#569ec2" // Light blue
                            borderRadius="xl"
                            size="lg"
                            _hover={{
                                bg: "#e6e6e6", // Light gray on hover
                                transform: "scale(1.05)"
                            }}
                            _active={{
                                bg: "#569ec2" // Light blue when active
                            }}
                            transition="all 0.2s"
                        >
                            Espace client
                        </Button>
                    </Flex>
                    <Flex width="100%" justify="flex-start" pl={8} mb={-8}>
                        {menuItems.map((btn, index) => (
                            <Button
                                key={index}
                                variant={isActiveRoute(btn.link) ? 'solid' : 'ghost'}
                                color={isActiveRoute(btn.link) ? '#2f6783' : '#ffffff'} // Dark blue for active, white for inactive
                                bg={isActiveRoute(btn.link) ? '#e6e6e6' : '#7cb3cf'} // Light gray for active, muted blue for inactive
                                _hover={{
                                    bg: isActiveRoute(btn.link) ? '#569ec2' : '#e6e6e6' // Light blue for active hover, light gray for inactive hover
                                }}
                                size="lg"
                                onClick={() => handleNavigate(btn.link)}
                                mr={4}
                                borderBottom={isActiveRoute(btn.link) ? '2px solid' : 'none'}
                                borderColor="#ffffff" // White border for active
                            >
                                {btn.label}
                            </Button>
                        ))}
                    </Flex>
                </VStack>
            </HStack>
        </Box>
    );
};

export default PublicHeader;