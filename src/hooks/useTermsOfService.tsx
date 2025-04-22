import { ReactNode } from 'react';
import { Text, List, ListItem } from '@chakra-ui/react';
import {
    FaUserShield,
    FaFileContract,
    FaCopyright,
    FaCreditCard,
    FaLock,
    FaExclamationTriangle,
    FaPencilAlt,
    FaSignInAlt
} from 'react-icons/fa';
import { Section } from '../types';

export const useTermsOfService = () => {
    const sections: Section[] = [
        {
            title: 'Objet et acceptation des conditions',
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
            ) as ReactNode
        },
        {
            title: 'Accès au service',
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
            ) as ReactNode
        },
        {
            title: 'Responsabilités de l\'utilisateur',
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
            ) as ReactNode
        },
        {
            title: 'Propriété intellectuelle',
            icon: FaCopyright,
            content: (
                <>
                    <List>
                        <ListItem>
                            📜 Tous les contenus du site (textes, images, code) sont protégés par les droits d'auteur.
                        </ListItem>
                        <ListItem>
                            🔹 Toute reproduction ou diffusion sans autorisation est interdite.
                        </ListItem>
                    </List>
                </>
            ) as ReactNode
        },
        {
            title: 'Abonnements & paiements',
            icon: FaCreditCard,
            content: (
                <>
                    <List>
                        <ListItem>
                            📅 Les abonnements sont mensuels ou annuels, avec prélèvement automatique.
                        </ListItem>
                        <ListItem>
                            🚀 L'utilisateur peut résilier son abonnement à tout moment via son espace client.
                        </ListItem>
                        <ListItem>
                            💰 Aucun remboursement n'est possible sauf en cas de dysfonctionnement du service.
                        </ListItem>
                    </List>
                </>
            ) as ReactNode
        },
        {
            title: 'Protection des données',
            icon: FaLock,
            content: (
                <>
                    <Text>
                        Nous respectons le RGPD et détaillons notre gestion des données dans notre Politique de confidentialité.
                    </Text>
                </>
            ) as ReactNode
        },
        {
            title: 'Limitation de responsabilité',
            icon: FaExclamationTriangle,
            content: (
                <>
                    <Text>
                        Nous ne pouvons être tenus responsables en cas :
                    </Text>
                    <List>
                        <ListItem>
                            ❌ D'interruptions temporaires du service.
                        </ListItem>
                        <ListItem>
                            ❌ De pertes de données dues à un piratage externe.
                        </ListItem>
                        <ListItem>
                            ❌ De mauvais usage du service par un utilisateur.
                        </ListItem>
                    </List>
                </>
            ) as ReactNode
        },
        {
            title: 'Modification des CGU',
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