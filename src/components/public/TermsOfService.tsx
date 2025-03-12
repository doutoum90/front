import {
    Box,
    VStack,
    Heading,
    Text,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Link,
    Button,
    Flex,
    Icon
} from '@chakra-ui/react';
import { FaBalanceScale, FaRegFileAlt, FaUserShield } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export const TermsOfService = () => {
    const sections = [
        {
            title: "1. Acceptation des conditions",
            icon: FaBalanceScale,
            content: "En utilisant notre service, vous acceptez pleinement et sans réserve les présentes conditions générales d'utilisation."
        },
        {
            title: "2. Utilisation du service",
            icon: FaRegFileAlt,
            content: "Le service est destiné à un usage professionnel et personnel. Toute utilisation illicite ou abusive est strictement interdite."
        },
        {
            title: "3. Responsabilités utilisateur",
            icon: FaUserShield,
            content: "Vous êtes responsable du maintien de la confidentialité de vos identifiants et de toutes les activités sur votre compte."
        },
        {
            title: "4. Propriété intellectuelle",
            icon: FaBalanceScale,
            content: "Tous les contenus et marques présents sur la plateforme sont la propriété exclusive d'Intelligentsia."
        },
        {
            title: "5. Résiliation",
            icon: FaRegFileAlt,
            content: "Nous nous réservons le droit de suspendre ou résilier tout compte en cas de violation des conditions d'utilisation."
        }
    ];

    return (
        <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            minH="100vh"
            bgGradient="linear(to-b, gray.50, blue.50)"
            py={16}
            px={{ base: 4, md: 8 }}
        >
            <Box maxW="container.lg" mx="auto">
                <VStack spacing={12} align="stretch">
                    <Heading
                        as="h1"
                        size="2xl"
                        textAlign="center"
                        bgGradient="linear(to-r, teal.600, blue.500)"
                        bgClip="text"
                    >
                        Conditions Générales d'Utilisation
                    </Heading>

                    <Text fontSize="lg" textAlign="center" color="gray.600">
                        Dernière mise à jour : 1 janvier 2024
                    </Text>

                    <Accordion allowToggle width="100%">
                        {sections.map((section, index) => (
                            <AccordionItem
                                key={index}
                                border="2px solid"
                                borderColor="gray.100"
                                borderRadius="lg"
                                mb={4}
                                _hover={{ borderColor: "teal.100" }}
                            >
                                <AccordionButton
                                    _hover={{ bg: "teal.50" }}
                                    p={6}
                                >
                                    <Flex flex="1" textAlign="left" align="center">
                                        <Icon as={section.icon} mr={4} color="teal.600" boxSize={6} />
                                        <Heading size="md">{section.title}</Heading>
                                    </Flex>
                                    <AccordionIcon color="teal.600" />
                                </AccordionButton>

                                <AccordionPanel pb={4} bg="white" borderRadius="lg">
                                    <Text lineHeight="tall" color="gray.600">
                                        {section.content}
                                    </Text>
                                </AccordionPanel>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <Box
                        bg="teal.50"
                        p={8}
                        borderRadius="xl"
                        textAlign="center"
                        mt={8}
                    >
                        <Text fontSize="lg" mb={4} color="teal.800">
                            Questions sur nos CGU ?
                        </Text>
                        <Button
                            as={Link}
                            href="/contact"
                            colorScheme="teal"
                            size="lg"
                            rightIcon={<FaRegFileAlt />}
                        >
                            Nous contacter
                        </Button>
                    </Box>
                </VStack>
            </Box>
        </MotionBox>
    );
};

export default TermsOfService;