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
    List,
    ListItem,
    Link
} from '@chakra-ui/react';
import {
    FaDatabase,
    FaChartLine,
    FaShareAlt,
    FaLock,
    FaUserCog,
    FaEnvelope,
    FaCookieBite,
    FaClipboardList
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { MAIL } from '../../constantes'
import { Section } from '../../types';

const MotionBox = motion(Box);

const sections: Section[] = [
    {
        title: "Données collectées",
        icon: FaDatabase,
        content: (
            <>
                <Text mb="2">Nous collectons uniquement les données Suivantes:</Text>
                <List spacing={2}>
                    <ListItem>• Données personnelles: Nom, prénom, email, numéro de téléphone</ListItem>
                    <ListItem>• Données de navigation: AdresseIP, cookies , historique de navigation</ListItem>
                    <ListItem>• Données de paiement: Traitées via des services sécurisés (Stripe, Paypal)</ListItem>
                </List>
            </>
        ),
    },
    {
        title: "Utilisation des Données",
        icon: FaChartLine,
        content: (
            <>
                <Text>Vos données sont utilisées pour:</Text>
                <List spacing={2}>
                    <ListItem>✅ La gestion de votre compte et l'accès à nos services</ListItem>
                    <ListItem>✅ L'amélioration de notre plateforme et de l'expérience utilisateur</ListItem>
                    <ListItem>✅ L'envoi de notifications, emails et offres promotionnelles(si consentement)</ListItem>
                    <ListItem>✅ La conformité aux obligations légales et sécuritaires</ListItem>
                </List>
            </>
        ),
    },
    {
        title: "Partage des données",
        icon: FaShareAlt,
        content: (
            <>
                <Text>Nous partageons pas vos données avec des tiers sauf:</Text>
                <List spacing={2}>
                    <ListItem>• Prestataires techniques (hébergement, paiment sécurisé, etc.)</ListItem>
                    <ListItem>• Obligations légales (autorités judiciaires si requis)</ListItem>
                </List>
            </>
        )
    },
    {
        title: "Sécurité des données",
        icon: FaLock,
        content: (
            <>
                <Text>Nous mettons en place des mesures de sécurité avancées:</Text>
                <List spacing={2}>
                    <ListItem>🔐 Cryptage des données</ListItem>
                    <ListItem>🛡️ Hébergement sécurisé.</ListItem>
                    <ListItem>📜 Protocoles de protection contre les cyberattaques.</ListItem>
                </List>
            </>
        )
    },
    {
        title: "Droits des utilisateurs",
        icon: FaUserCog,
        content: (
            <>
                <Text>Conformément au RGPD (UE) et CCPA (USA), vous avez les droits de:</Text>
                <List spacing={2}>
                    <ListItem>📩 Accéder à vos données.</ListItem>
                    <ListItem>📝 Les modifier ou les supprimer.</ListItem>
                    <ListItem>❌ Retirer votre consentement à tout moment.</ListItem>
                    <ListItem>📬 Demander une copie de vos données.</ListItem>
                </List>
            </>
        )
    },
    {
        title: "Contact",
        icon: FaEnvelope,
        content: (
            <>
                <Text>Pour toute demande, envoyer un email à l'adresse suivante:</Text>
                <Text>Email: <Link href={`mailto:${MAIL}`}>{MAIL}</Link></Text>
            </>
        )
    },
    {
        title: "Cookies et technologies similaires",
        icon: FaCookieBite,
        content: (
            <>
                <Text>Nous utilisons des cookies pour :</Text>
                <List spacing={2}>
                    <ListItem>• 🍪 Améliorer la navigation et analyser le trafic.</ListItem>
                    <ListItem>• 🔄 Personnaliser le contenu et les publicités.</ListItem>
                </List>

                <Text>📍 Vous pouvez gérer vos préférences via les paramètres de votre navigateur.</Text>
            </>
        )
    },
    {
        title: "Modification de la politique de confidentialité",
        icon: FaClipboardList,
        content: (
            <>
                <Text>Nous nous réservons le droit de modifier cette politique de confidentialité en fonction des besoins de notre service.</Text>
            </>
        )
    }
];

export const PrivacyPolicy = () => {
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

                    {/* <Box
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
                    </Box> */}
                </VStack>
            </Box>
        </MotionBox>
    );
};

export default PrivacyPolicy;