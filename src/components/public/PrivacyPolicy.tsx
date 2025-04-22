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
    Flex,
    Icon,
    Button,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaShieldAlt } from 'react-icons/fa';
import { usePrivacyPolicy } from '../../hooks/usePrivacyPolicy';

const MotionBox = motion(Box);


export const PrivacyPolicy = () => {
    const { sections } = usePrivacyPolicy();

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
                        Politique de Confidentialité
                    </Heading>

                    <Text fontSize="lg" textAlign="center" color="gray.600">
                        Effective à compter du {new Date('19/03/2025').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
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
                                    {typeof section.content === 'string' ? (
                                        <Text lineHeight="tall" color="gray.600">
                                            {section.content}
                                        </Text>
                                    ) : section.content}
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
                        <Text fontSize="xl" mb={4} color="teal.800">
                            Contrôlez vos données
                        </Text>
                        <Button
                            colorScheme="teal"
                            size="lg"
                            rightIcon={<FaShieldAlt />}
                            mr={4}
                        >
                            Exporter mes données
                        </Button>
                        <Button
                            variant="outline"
                            colorScheme="teal"
                            size="lg"
                        >
                            Supprimer mon compte
                        </Button>
                    </Box>
                </VStack>
            </Box>
        </MotionBox>
    );
};

export default PrivacyPolicy;