import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHome, FaChartPie, FaBell, FaFileAlt, FaUser, FaEye, FaCogs, FaGlobeAmericas } from "react-icons/fa"

export const FAQ = [
    {
        title: "Abonnement & Tarification",
        questions: [
            {
                question: "Q1 : Quels sont les moyens de paiement acceptés ?",
                reponse: "Nous acceptons les paiements par carte bancaire (Visa, Mastercard, AMEX) et virement bancaire pour les abonnements annuels."
            },
            {
                question: "Q2 : Puis-je changer de formule en cours d'abonnement ?",
                reponse: "Oui, vous pouvez passer à une offre supérieure ou inférieure à tout moment via votre espace client."
            },
            {
                question: "Q3 : Y a-t-il une période d'essai gratuite ?",
                reponse: "Oui, nous offrons un essai gratuit de 14 jours pour vous permettre de tester toutes les fonctionnalités."
            }
        ]
    },
    {
        title: "Fonctionnalités & Utilisation",
        questions: [
            {
                question: "Q4 : Comment fonctionne la veille concurrentielle ?",
                reponse: "Notre IA analyse en continu les évolutions du marché et vous envoie des alertes personnalisées."
            },
            {
                question: "Q5 : Les rapports sont-ils personnalisés ?",
                reponse: "Oui, vous pouvez choisir les données et les indicateurs clés que vous souhaitez inclure dans vos rapports."
            },
            {
                question: "Q6 : Comment accéder aux analyses de tendances marché ?",
                reponse: "Les analyses sont disponibles directement depuis votre tableau de bord et mises à jour en temps réel."
            }
        ]
    }
]

export const ACTIONS = [
    {
        title: "📡 Veille Concurrentielle Automatisée",
        description: "Surveillez vos concurrents en temps réel et recevez des alertes sur leurs évolutions stratégiques (nouveaux produits, levées de fonds, recrutements, campagnes marketing…). Ne subissez plus le marché, anticipez-le."
    },
    {
        title: "📊 Analyse des Tendances Marché",
        description: "Grâce à notre IA, identifiez les grandes dynamiques de votre secteur : variations de prix, innovations émergentes, évolutions réglementaires. Bénéficiez d'un tableau de bord interactif pour visualiser les données essentielles à votre prise de décision."
    },
    {
        title: "📌 Détection d'Opportunités d'Affaires",
        description: "Accédez à des appels d'offres, partenariats et nouvelles opportunités commerciales adaptées à votre activité. Trouvez en quelques clics les meilleures opportunités pour développer votre entreprise."
    },
    {
        title: "🌍 Cartographie des Risques et Opportunités",
        description: "Analysez en temps réel les menaces et opportunités qui impactent votre marché. Grâce à notre cartographie intelligente, identifiez les tendances émergentes, anticipez les évolutions réglementaires et adaptez votre stratégie en fonction des risques géopolitiques et économiques."
    },
    {
        title: "📈 Rapports Stratégiques à la Demande",
        description: "Accédez à des analyses approfondies sur les tendances du marché et les dynamiques internationales. Nos rapports sur mesure vous offrent une vision claire des opportunités de croissance, des évolutions sectorielles et des prévisions stratégiques, pour une expansion optimisée."
    }
]

export const PARAGRAPHS = [{
    title: "  Présentation de l'Entreprise",
    sousParagraphs: [{
        title: "🚀 Qui sommes-nous ?",
        description: "Intelligentsia est une plateforme d'intelligence économique qui accompagne les entreprises dans leur prise de décision stratégique. Grâce à l'IA et à l'analyse avancée des données, nous aidons les TPE et PME à anticiper les tendances et à optimiser leur compétitivité.",
    },
    {
        title: "🎯 Notre mission",
        description: "Notre mission est de démocratiser l'intelligence économique en rendant accessible des outils puissants de veille, d'analyse et de reporting. Nous permettons aux entreprises de mieux comprendre leur marché, de détecter les opportunités et de minimiser les risques."
    }]
},
{
    title: "Une veille automatisée, un avantage concurrentiel durable",
    sousParagraphs: [{
        title: "💡 Innovation",
        description: "Nous mettons l'intelligence artificielle au service de la stratégie pour offrir des analyses précises et actionnables."
    },
    {
        title: "🤝 Transparence",
        description: "Nos données et nos analyses sont claires et fiables, permettant une prise de décision éclairée."
    },
    {
        title: "📊 Performance",
        description: "Nos outils sont conçus pour offrir des insights pertinents et un réel avantage concurrentiel à nos clients."
    },
    {
        title: "🌍 Vision internationale",
        description: "Nous accompagnons les entreprises dans leur expansion en leur fournissant une vision globale du marché."
    }]
}]

export const TITLES = {
    "title": "Prenez une longueur d'avance avec l'intelligence Économique",
    "subtitle1": "📡Surveillez vos concurrents.",
    "subtitle2": "💡Détectez les opportunités.",
    "subtitle3": "🚀Anticipez le marché."
}
export const HOME_PARAGRAPHS = [{
    title: " Anticipez: Décidez. Gagnez.",
    description: "Dans un monde en constante évolution, chaque décision compte. Intelligentsla vous donne un coup d'avance grâce à l'intelligence économique. Analysez votre marché, surveillez vos concurrents et détectez les opportunités avant les autres. Grâce à notre technologie basée sur l'IA, nous transformons des milliers de données en informations stratégiques exploitables, pour vous permettre de prendre les meilleures décisions, au bon moment.",
},
{
    title: "Une veille automatisée, un avantage concurrentiel durable",
    description: "Finies les recherches interminables et les décisions basées sur l'intuition. Notre plateforme vous alerte en temps réel sur les tendances, les évolutions du marché et les opportunités d'affaires adaptées à votre activité. Que vous soyez une TPE ou un entrepreneur ambitieux, Intelligentsla vous offre les outils pour comprendre, anticiper et dominer votre secteur."
}]

export const CONCLUSION = "🚀 Avec Intelligentsia, transformez l'information en décision et prenez une longueur d'avance sur votre marché."

export const SUBSCRIBE_BUTTON = "S'abonner"
export const TYPE_ABONNEMENT = ["Essentiel", "Pro", "Expert"]
export const FONCTIONNALITES_HEADER = ["Fonctionnalités", ...TYPE_ABONNEMENT]
export const FONCTIONNALITES = [
    {
        nom: "Veille concurrentielle",
        essentiel: true,
        pro: true,
        expert: true,
        type: 'check'
    },
    {
        nom: "Cartographie des risques",
        essentiel: false,
        pro: true,
        expert: true,
        type: 'check'
    },
    {
        nom: "Rapports détaillés",
        essentiel: false,
        pro: true,
        expert: true,
        type: 'check'
    },
    {
        nom: "Alertes stratégiques",
        essentiel: true,
        pro: true,
        expert: true,
        type: 'check'
    },
    {
        nom: "Accès API",
        essentiel: false,
        pro: false,
        expert: true,
        type: 'check'
    },
    {
        nom: "Support dédié",
        essentiel: 'Email',
        pro: 'Chat',
        expert: 'Prioritaire',
        type: 'text'
    },
    {
        nom: "Prix",
        essentiel: '29€',
        pro: '59€',
        expert: '99€',
        type: 'text'
    },
    {
        nom: SUBSCRIBE_BUTTON,
        essentiel: SUBSCRIBE_BUTTON,
        pro: SUBSCRIBE_BUTTON,
        expert: SUBSCRIBE_BUTTON,
        type: 'btn'
    }
]

export const FORMULE_TITLES = {
    title: "Choisissez la formule qui accélère votre croissance.",
    subtitle: "Des solutions adaptées à chaque entreprise, de la veille stratégique à l’analyse avancée.",
    commentaires: "⭐ Ce qu’ils disent de nous"
}
export const COMMENTAIRES = [
    {
        nom: " 📢 Claire M. - Dirigeante d’une PME",
        commentaire: "Grâce à Intelligentsia, nous avons pu anticiper une évolution réglementaire majeure qui aurait pu impacter notre activité. Un vrai game-changer !"
    },
    {
        nom: " 📢 Julien D. - Responsable Stratégie",
        commentaire: "Les rapports stratégiques sur demande sont précis et ultra-pertinents. Un outil indispensable pour notre expansion à l’international."
    },
    {
        nom: " 📢 Sophie L. - Fondatrice d’une startup tech",
        commentaire: "La veille concurrentielle automatisée nous permet de rester réactifs et de toujours avoir un coup d’avance sur le marché."
    }
]



export const FAQ_TITLES = {
    title: "Une question ? Nous avons la réponse !",
    subtitle: "Découvrez tout ce qu'il faut savoir sur Intelligentsia et maximisez votre expérience."

}

export const ABOUT_TITLES = {
    title: "Intelligentsia, votre allié en intelligence économique",
    subtitle: "Nous transformons l'information en décision stratégique pour vous donner un temps d'avance."
}

export const PUBLIC_MENU = [
    {
        label: "Nos actions",
        link: "/actions"
    },
    {
        label: "Nos formules",
        link: "/formules"
    },
    {
        label: "FAQ",
        link: "/faq"
    },
    {
        label: "À propos",
        link: "/about"
    },
    {
        label: "Contact",
        link: "/contact"
    }
];


export const MAIL = "contact@intelligentsia.fr";
export const PHONE = "+33 1 23 45 67 89";
export const ADDRESS = "12 Rue de l'Innovation, 75000 Paris";
export const SOCIAL_MEDIA = [
    {
        icon: FaFacebook,
        link: "https://www.facebook.com/intelligentsia",
    },
    {
        icon: FaTwitter,
        link: "https://www.twitter.com/intelligentsia",
    },
    {
        icon: FaLinkedin,
        link: "https://www.linkedin.com/intelligentsia",
    },
    {
        icon: FaInstagram,
        link: "https://www.instagram.com/intelligentsia",
    },
];
export const YEAR = new Date().getFullYear();
export const COPYRIGHT = `© ${YEAR} Intelligentsia. Tous droits réservés`;
export const OTHER_LINKS = [
    {
        label: "Politique de confidentialité",
        link: "/privacy",
    },
    {
        label: "Conditions d'utilisation",
        link: "/terms",
    },
];

export const PROTECTED_MENU = [
    {
        name: 'Accueil',
        path: '/espace-membre/dashboard',
        icon: FaHome
    },
    {
        name: 'Veille concurentielle',
        path: '/espace-membre/veille-concurentielle',
        icon: FaUser
    },
    {
        name: 'Analyse de marché',
        path: '/espace-membre/analyse-de-marche',
        icon: FaChartPie
    },
    {
        name: 'Surveillance des \n opportunités et risques',
        path: '/espace-membre/surveillance-des-opportunites-et-risques',
        icon: FaBell
    },
    {
        name: 'Rapport sur mesure',
        path: '/espace-membre/rapport-sur-mesure',
        icon: FaFileAlt
    }
]

export const DASHBOARD_TITLE = "Tableau de bord"
export const DASHBOARD_DATA = [
    {
        name: 'Veille concurentielle',
        uv: 4000,
        text: 'Surveillez vos concurrents et anticiper leurs mouvements.',
        path: '/espace-membre/veille-concurentielle',
        icon: FaEye,
        color: 'purple.500'
    },
    {
        name: 'Analyse de marché',
        uv: 3000,
        text: 'Obtenez des analyses detaillées sur les tendances.',
        path: '/espace-membre/analyse-de-marche',
        icon: FaChartPie,
        color: 'teal.500'
    },
    {
        name: 'Surveillance des opportunités et risques',
        uv: 5000,
        text: 'Recevez des alertes en temps réel sur votre secteur et sur les changements législatifs et réglementaires.',
        path: '/espace-membre/surveillance-des-opportunites-et-risques',
        icon: FaGlobeAmericas,
        color: 'orange.500'
    },
    {
        name: 'Rapport sur mesure',
        uv: 2780,
        text: 'Obtenez des données individualisées sur une thématique de marchés ou sur une projections à l\'international.',
        path: '/espace-membre/rapport-sur-mesure',
        icon: FaFileAlt,
        color: 'pink.500'
    },
    {
        name: 'Paramètres',
        uv: 1890,
        text: 'Personnalisez votre experience et vos preferences.',
        path: '/espace-membre/parametres',
        icon: FaCogs,
        color: 'blue.500'
    },
]

export const PRICE_MAP = {
    'essentiel': import.meta.env.VITE_ESSENTIEL_PRICE_ID || 'price_1R4NK1QMk6qRSmo1egY1hfsD',
    'pro': import.meta.env.VITE_PRO_PRICE_ID || 'price_1R4NJCQMk6qRSmo112OpuuEU',
    'expert': import.meta.env.VITE_EXPERT_PRICE_ID || 'price_1R4NKMQMk6qRSmo1CObfbfsU',
};

export const AUTH_FORM_COLORS = {
    formBgLight: 'app.formBg.light',
    formBgDark: 'app.formBg.dark',
    heading: 'app.heading',
    text: 'app.text',
    link: 'app.link',
    focusBorder: 'app.focusBorder',
    spinner: 'app.spinner',
    buttonHover: { transform: 'translateY(-2px)' },
};
