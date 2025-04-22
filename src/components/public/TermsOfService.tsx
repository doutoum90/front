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
    Icon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useTermsOfService } from '../../hooks/useTermsOfService';

const MotionBox = motion(Box);

export const TermsOfService = () => {
    const { sections, lastUpdate } = useTermsOfService();

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
                        Bienvenue sur Intelligentsia ! En utilisant notre plateforme, vous acceptez les présentes Conditions Générales d'Utilisation (CGU).
                    </Text>

                    <Text fontSize="lg" textAlign="center" color="gray.600">
                        Dernière mise à jour : {lastUpdate}
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
                            href="mailto:contact@intelligentsia.fr"
                            colorScheme="teal"
                            size="lg"
                            _hover={{ transform: "scale(1.05)" }}
                            transition="all 0.2s"
                        >
                            Contactez-nous
                        </Button>
                    </Box>
                </VStack>
            </Box>
        </MotionBox>
    );
};

export default TermsOfService;