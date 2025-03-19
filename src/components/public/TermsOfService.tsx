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
    ListItem,
    List
} from '@chakra-ui/react';
import {
    FaUserShield,
    FaFileContract,
    FaCopyright,
    FaCreditCard,
    FaLock,
    FaExclamationTriangle,
    FaPencilAlt,
    FaSignInAlt,
    FaRegFileAlt
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Section } from '../../types';
const MotionBox = motion(Box);

const sections: Section[] = [
    {
        title: "Objet et acceptation des conditions",
        icon: FaFileContract,
        content: (
            <>
                <Text>
                    Les présentes conditions générales d'utilisation (CGU) encadrent l'utilisation de notre site www.intelligentsia.com
                </Text>
                <Text>
                    En utilisant nos services, vous acceptez ces conditions.
                </Text>
            </>
        )
    },
    {
        title: "Accès au service",
        icon: FaSignInAlt,
        content: (
            <>
                <List>
                    <ListItem>
                        L'accès à la plateforme est réservé aux utilisateurs inscrits.
                    </ListItem>
                    <ListItem>
                        Certaines fonctionnalités sont payantes et accessibles via abonnement.
                    </ListItem>
                </List>
                <Text>
                    Nous nous réservons le droit de suspendre ou supprimer un compte en cas de non-respect des conditions d'utilisation.
                </Text>

            </>
        )
    },
    {
        title: "Responsabilités de l'utilisateur",
        icon: FaUserShield,
        content: (
            <>
                <Text>
                    L'utilisateur s'engage à :
                </Text>
                <List>
                    <ListItem>
                        Fournir des informations exactes et à jour lors de l'inscription.
                    </ListItem>
                    <ListItem>
                        Ne pas utiliser le site à des fins illégales (fraude, piratage, etc.).
                    </ListItem>
                    <ListItem>
                        Respecter la propriété intellectuelle (contenu, logos, textes).
                    </ListItem>

                </List>
            </>
        )
    },
    {
        title: "Propriété intellectuelle",
        icon: FaCopyright,
        content: (
            <>
                <List>
                    <ListItem>
                        📜 Tous les contenus du site (textes, images, code) sont protégés par les droits d’auteur.
                    </ListItem>
                    <ListItem>
                        🔹 Toute reproduction ou diffusion sans autorisation est interdite.
                    </ListItem>
                </List>
            </>
        )
    },
    {
        title: "Abonnements & paiements",
        icon: FaCreditCard,
        content: (
            <>
                <List>
                    <ListItem>
                        📅 Les abonnements sont mensuels ou annuels, avec prélèvement automatique.
                    </ListItem>
                    <ListItem>
                        🚀 L’utilisateur peut résilier son abonnement à tout moment via son espace client.
                    </ListItem>
                    <ListItem>
                        💰 Aucun remboursement n’est possible sauf en cas de dysfonctionnement du service.
                    </ListItem>
                </List>
            </>
        )
    },
    {
        title: "Protection des données",
        icon: FaLock,
        content: (
            <>
                <Text>
                    Nous respectons le RGPD et détaillons notre gestion des données dans notre Politique de confidentialité..
                </Text>
            </>
        )
    },
    {
        title: "Limitation de responsabilité",
        icon: FaExclamationTriangle,
        content: (
            <>
                <Text>
                    Nous ne pouvons être tenus responsables en cas :

                </Text>
                <List>
                    <ListItem>
                        ❌ D’interruptions temporaires du service.
                    </ListItem>
                    <ListItem>
                        ❌ De pertes de données dues à un piratage externe.
                    </ListItem>
                    <ListItem>
                        ❌ De mauvais usage du service par un utilisateur.
                    </ListItem>
                </List>

            </>
        )
    },
    {
        title: "Modification des CGU",
        icon: FaPencilAlt,
        content: (
            <>
                <Text>
                    Nous pouvons modifier ces CGU à tout moment. Les utilisateurs seront informés des changements via email ou notification sur le site.
                </Text>

                <Text>
                    📩 Pour toute question, contactez-nous à [contact@intelligentsia.fr].
                </Text>
            </>
        )
    }
];
export const TermsOfService = () => {


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
                        Bienvenue sur Intelligentsia ! En utilisant notre plateforme, vous acceptez les présentes Conditions Générales d’Utilisation (CGU).
                    </Text>

                    <Text fontSize="lg" textAlign="center" color="gray.600">
                        Dernière mise à jour : {new Date('19/03/2025').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
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