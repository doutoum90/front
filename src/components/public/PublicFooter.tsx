import { Flex, Grid, GridItem, Text, Link, Icon, Box, Heading, Input, InputGroup, InputRightElement, Button, FormControl } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { MENU, ADDRESS, PHONE, MAIL, SOCIAL_MEDIA, COPYRIGHT, OTHER_LINKS, SUBSCRIBE_BUTTON } from '../../constantes';
import { useNavigate } from 'react-router-dom';

export const PublicFooter = () => {
    const navigate = useNavigate();

    return (
        <Box bg="gray.800" color="white" mt={16}>
            <Flex
                direction="column"
                maxW="container.xl"
                mx="auto"
                px={{ base: 4, md: 8 }}
                py={12}
            >
                {/* Main Footer Content */}
                <Grid
                    templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
                    gap={8}
                    mb={12}
                >
                    {/* Company Info */}
                    <GridItem>
                        <Heading size="lg" mb={4} color="teal.300">
                            Intelligentsia
                        </Heading>
                        <Text fontSize="sm" lineHeight="tall">
                            L'intelligence économique au service des entreprises innovantes
                        </Text>
                    </GridItem>

                    {/* Quick Links */}
                    <GridItem>
                        <Heading size="md" mb={4} color="teal.300">
                            Navigation
                        </Heading>
                        <Flex direction="column">
                            {MENU.map((btn, index) => (
                                <Link href={btn.link} _hover={{ color: "teal.400", textDecoration: "underline" }} mb={2} key={index}>
                                    {btn.label}
                                </Link>
                            ))}
                            <Link href="/contact" _hover={{ color: "teal.400", textDecoration: "underline" }}>
                                Contact
                            </Link>
                        </Flex>
                    </GridItem>

                    {/* Contact Info */}
                    <GridItem>
                        <Heading size="md" mb={4} color="teal.300">
                            Contact
                        </Heading>
                        <Flex direction="column" gap={3}>
                            <Flex align="center">
                                <Icon as={FaMapMarkerAlt} mr={3} />
                                <Text>{ADDRESS}</Text>
                            </Flex>
                            <Flex align="center">
                                <Icon as={FaPhone} mr={3} />
                                <Text>{PHONE}</Text>
                            </Flex>
                            <Flex align="center">
                                <Icon as={FaEnvelope} mr={3} />
                                <Link href={`mailto:${MAIL}`} _hover={{ color: "teal.400" }}>
                                    {MAIL}
                                </Link>
                            </Flex>
                        </Flex>
                    </GridItem>

                    {/* Newsletter */}
                    <GridItem>
                        <Heading size="md" mb={4} color="teal.300">
                            Newsletter
                        </Heading>
                        <FormControl>
                            <InputGroup>
                                <Input
                                    placeholder="Votre email"
                                    _placeholder={{ color: "gray.400" }}
                                    borderColor="gray.600"
                                    _focus={{ borderColor: "teal.400" }}
                                />
                                <InputRightElement width="fit-content">
                                    <Button
                                        colorScheme="teal"
                                        size="sm"
                                        mr={1}
                                        borderRadius="md"
                                        _hover={{ transform: "scale(1.05)" }}
                                        onClick={() => navigate('/auth/subscription')}
                                    >
                                        {SUBSCRIBE_BUTTON}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>

                        {/* Social Media */}
                        <Flex mt={6} gap={4}>
                            {SOCIAL_MEDIA.map((social, index) => (
                                <Link href={social.link} key={index}>
                                    <Icon as={social.icon} boxSize={6} _hover={{ color: "teal.400", cursor: "pointer" }} />
                                </Link>
                            ))}
                        </Flex>
                    </GridItem>
                </Grid>

                {/* Copyright & Legal */}
                <Flex
                    borderTop="1px solid"
                    borderColor="gray.700"
                    pt={8}
                    justify="space-between"
                    direction={{ base: "column", md: "row" }}
                    align="center"
                    gap={4}
                >
                    <Text fontSize="sm" color="gray.400">
                        {COPYRIGHT}
                    </Text>
                    <Flex gap={6}>
                        {OTHER_LINKS.map((link, index) => (
                            <Link href={link.link} fontSize="sm" _hover={{ color: "teal.400" }} key={index}>
                                {link.label}
                            </Link>
                        ))}
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
};