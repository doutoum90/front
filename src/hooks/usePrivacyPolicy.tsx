import { ReactNode } from 'react';
import { Text, List, ListItem, Link } from '@chakra-ui/react';
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
import { MAIL } from '../constantes';
import { Section } from '../types';
        
export const usePrivacyPolicy = () => {
    const sections: Section[] = [
        {
            title: 'Données collectées',
            icon: FaDatabase,
            content: (
                <>
                    <Text mb='2'>Nous collectons uniquement les données Suivantes:</Text>
                    <List spacing={2}>
                        <ListItem>• Données personnelles: Nom, prénom, email, numéro de téléphone</ListItem>
                        <ListItem>• Données de navigation: AdresseIP, cookies , historique de navigation</ListItem>
                        <ListItem>• Données de paiement: Traitées via des services sécurisés (Stripe, Paypal)</ListItem>
                    </List>
                </>
            ) as ReactNode
        },
        {
            title: 'Utilisation des Données',
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
            ) as ReactNode
        },
        {
            title: 'Partage des données',
            icon: FaShareAlt,
            content: (
                <>
                    <Text>Nous partageons pas vos données avec des tiers sauf:</Text>
                    <List spacing={2}>
                        <ListItem>• Prestataires techniques (hébergement, paiment sécurisé, etc.)</ListItem>
                        <ListItem>• Obligations légales (autorités judiciaires si requis)</ListItem>
                    </List>
                </>
            ) as ReactNode
        },
        {
            title: 'Sécurité des données',
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
            ) as ReactNode
        },
        {
            title: 'Droits des utilisateurs',
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
            ) as ReactNode
        },
        {
            title: 'Contact',
            icon: FaEnvelope,
            content: (
                <>
                    <Text>Pour toute demande, envoyer un email à l'adresse suivante:</Text>
                    <Text>Email: <Link href={`mailto:${MAIL}`}>{MAIL}</Link></Text>
                </>
            ) as ReactNode
        },
        {
            title: 'Cookies et technologies similaires',
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
            ) as ReactNode
        },
        {
            title: 'Modification de la politique de confidentialité',
            icon: FaClipboardList,
            content: (
                <>
                    <Text>Nous nous réservons le droit de modifier cette politique de confidentialité en fonction des besoins de notre service.</Text>
                </>
            ) as ReactNode
        }
    ];

    const lastUpdate = new Date('19/03/2025').toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });

    return {
        sections,
        lastUpdate
    };
}; 