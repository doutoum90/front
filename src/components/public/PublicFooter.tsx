import { Flex, Grid, GridItem, Text, Link, Icon, Box, Heading } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { usePublicFooter } from '../../hooks/usePublicFooter';

export const PublicFooter = () => {
    const { menuItems, address, phone, email, socialMedia, copyright, otherLinks, handleEmailClick } = usePublicFooter();

    return (
        <Box bg="#2f6783" color="#ffffff" mt={16}> {/* Dark blue background, white text */}
            <Flex
                direction='column'
                maxW='container.xl'
                mx='auto'
                px={{ base: 4, md: 8 }}
                py={12}
            >
                <Grid
                    templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }}
                    gap={8}
                    mb={12}
                >
                    <GridItem>
                        <Heading size='lg' mb={4} color="#7cb3cf"> {/* Muted blue for heading */}
                            Intelligentsia
                        </Heading>
                        <Text fontSize='sm' lineHeight='tall'>
                            L'intelligence économique au service des entreprises innovantes
                        </Text>
                    </GridItem>

                    <GridItem>
                        <Heading size='md' mb={4} color="#7cb3cf"> {/* Muted blue for heading */}
                            Navigation
                        </Heading>
                        <Flex direction='column'>
                            {menuItems.map((btn, index) => (
                                <Link href={btn.link} _hover={{ color: '#569ec2' }} mb={2} key={index}> {/* Light blue on hover */}
                                    {btn.label}
                                </Link>
                            ))}
                        </Flex>
                    </GridItem>

                    <GridItem>
                        <Heading size='md' mb={4} color="#7cb3cf"> {/* Muted blue for heading */}
                            Contact
                        </Heading>
                        <Flex direction='column' gap={3}>
                            <Flex align='center'>
                                <Icon as={FaMapMarkerAlt} mr={3} />
                                <Text>{address}</Text>
                            </Flex>
                            <Flex align='center'>
                                <Icon as={FaPhone} mr={3} />
                                <Text>{phone}</Text>
                            </Flex>
                            <Flex align='center'>
                                <Icon as={FaEnvelope} mr={3} />
                                <Link onClick={() => handleEmailClick(email)} _hover={{ color: '#569ec2', cursor: 'pointer' }}> {/* Light blue on hover */}
                                    {email}
                                </Link>
                            </Flex>
                        </Flex>
                    </GridItem>

                    <GridItem>
                        <Flex mt={6} gap={4}>
                            {socialMedia.map((social, index) => (
                                <Link href={social.link} key={index}>
                                    <Icon as={social.icon} boxSize={6} _hover={{ color: '#569ec2', cursor: 'pointer' }} /> {/* Light blue on hover */}
                                </Link>
                            ))}
                        </Flex>
                    </GridItem>
                </Grid>

                <Flex
                    borderTop='1px solid'
                    borderColor="#3d84a8" // Primary blue for border
                    pt={8}
                    justify='space-between'
                    direction={{ base: 'column', md: 'row' }}
                    align='center'
                    gap={4}
                >
                    <Text fontSize='sm' color="#e6e6e6"> {/* Light gray for copyright text */}
                        {copyright}
                    </Text>
                    <Flex gap={6}>
                        {otherLinks.map((link, index) => (
                            <Link href={link.link} fontSize='sm' _hover={{ color: '#569ec2' }} key={index}> {/* Light blue on hover */}
                                {link.label}
                            </Link>
                        ))}
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
};

export default PublicFooter;