import { Heading, Text, Box, Button, Textarea, HStack, VStack, useToast, GridItem, Grid, Flex, Icon, Input, FormControl, FormLabel } from "@chakra-ui/react"
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { FaTwitter } from "react-icons/fa";
import { useState } from "react"
import { motion } from 'framer-motion';
import { MAIL } from "../../constantes";
const MotionBox = motion(Box);


export const Contact = () => {
    const [message, setMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const toast = useToast();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/support/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });

            if (response.ok) {
                setResponseMessage('Votre message a été envoyé avec succès.');
                setMessage('');
                toast({
                    title: 'Message envoyé',
                    description: 'Votre message a été envoyé avec succès.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
                setIsSubmitting(false);
            } else {
                setResponseMessage('Erreur lors de l\'envoi du message.');
            }
        } catch (error) {
            setResponseMessage('Erreur lors de l\'envoi du message.');
        }
    };
    return (
        <Flex
            minH="100vh"
            bgGradient="linear(to-br, gray.50, blue.50)"
            py={16}
            px={{ base: 4, md: 8 }}
            align="center"
        >
            <Box maxW="container.xl" mx="auto" width="100%">
                <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Heading
                        as="h1"
                        size="2xl"
                        textAlign="center"
                        mb={12}
                        bgGradient="linear(to-r, teal.600, blue.500)"
                        bgClip="text"
                    >
                        Contactez-nous
                    </Heading>

                    <Grid
                        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                        gap={12}
                        bg="white"
                        borderRadius="2xl"
                        p={8}
                        boxShadow="xl"
                    >
                        {/* Formulaire */}
                        <GridItem>
                            <form onSubmit={handleSubmit}>
                                <VStack spacing={6}>
                                    <FormControl isRequired>
                                        <FormLabel>Votre nom</FormLabel>
                                        <Input
                                            placeholder="Jean Dupont"
                                            focusBorderColor="teal.500"
                                            size="lg"
                                        />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Adresse email</FormLabel>
                                        <Input
                                            type="email"
                                            placeholder="contact@entreprise.fr"
                                            focusBorderColor="teal.500"
                                            size="lg"
                                        />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Sujet</FormLabel>
                                        <Input
                                            placeholder="Demande de renseignement"
                                            focusBorderColor="teal.500"
                                            size="lg"
                                        />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Message</FormLabel>
                                        <Textarea
                                            placeholder="Décrivez votre demande..."
                                            focusBorderColor="teal.500"
                                            size="lg"
                                            minH="200px"
                                        />
                                    </FormControl>

                                    <Button
                                        type="submit"
                                        colorScheme="teal"
                                        size="lg"
                                        width="100%"
                                        isLoading={isSubmitting}
                                        loadingText="Envoi en cours..."
                                        rightIcon={<FaPaperPlane />}
                                        _hover={{ transform: "scale(1.02)" }}
                                        transition="all 0.2s"
                                    >
                                        Envoyer le message
                                    </Button>
                                </VStack>
                            </form>
                        </GridItem>

                        {/* Informations de contact */}
                        <GridItem>
                            <VStack spacing={8} align="start" height="100%">
                                <Box>
                                    <Heading size="md" mb={4} color="teal.600">
                                        Nos coordonnées
                                    </Heading>

                                    <VStack spacing={6} align="start">
                                        <HStack>
                                            <Icon as={FaMapMarkerAlt} boxSize={6} color="teal.500" />
                                            <Text fontSize="lg">
                                                12 Rue de l'Innovation<br />
                                                75000 Paris, France
                                            </Text>
                                        </HStack>

                                        <HStack>
                                            <Icon as={FaPhone} boxSize={6} color="teal.500" />
                                            <Text fontSize="lg">+33 1 23 45 67 89</Text>
                                        </HStack>

                                        <HStack>
                                            <Icon as={FaEnvelope} boxSize={6} color="teal.500" />
                                            <Text fontSize="lg">{MAIL}</Text>
                                        </HStack>
                                    </VStack>
                                </Box>

                                <Box width="100%">
                                    <Heading size="md" mb={4} color="teal.600">
                                        Nous trouver
                                    </Heading>
                                    <iframe
                                        title="Carte"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916261109526!2d2.292292615509614!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1623256787894!5m2!1sfr!2sfr"
                                        width="100%"
                                        height="300"
                                        style={{ border: 0, borderRadius: "12px" }}
                                        loading="lazy"
                                    />
                                </Box>

                                <HStack spacing={6} mt={4} justify="center" width="100%">
                                    <Icon
                                        as={FaFacebook}
                                        boxSize={8}
                                        color="teal.600"
                                        _hover={{ color: "teal.500", cursor: "pointer" }}
                                    />
                                    <Icon
                                        as={FaTwitter}
                                        boxSize={8}
                                        color="teal.600"
                                        _hover={{ color: "teal.500", cursor: "pointer" }}
                                    />
                                    <Icon
                                        as={FaLinkedin}
                                        boxSize={8}
                                        color="teal.600"
                                        _hover={{ color: "teal.500", cursor: "pointer" }}
                                    />
                                </HStack>
                            </VStack>
                        </GridItem>
                    </Grid>
                </MotionBox>
            </Box>
        </Flex>
    );
};

export default Contact;