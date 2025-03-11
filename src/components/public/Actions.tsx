import { Heading, Text, Button, Box, VStack, Divider } from '@chakra-ui/react';

export const Actions = () => {
  return (<>
    <VStack spacing={12} align="stretch">
      {/* Veille Concurrentielle */}
      <Box>
        <Heading as="h3" size="md" color="gray.800" mb={4}>
          Veille Concurrentielle Automatisée
        </Heading>
        <Text color="gray.600" lineHeight="tall">
          Surveillez vos concurrents en temps réel et recevez des alertes sur leurs évolutions stratégiques
          (nouveaux produits, levées de fonds, recrutements, campagnes marketing…). Ne subissez plus le marché,
          anticipez-le.
        </Text>
      </Box>

      <Divider borderColor="gray.200" />

      {/* Analyse des Tendances */}
      <Box>
        <Heading as="h3" size="md" color="gray.800" mb={4}>
          📊 Analyse des Tendances Marché
        </Heading>
        <Text color="gray.600" lineHeight="tall">
          Grâce à notre IA, identifiez les grandes dynamiques de votre secteur : variations de prix,
          innovations émergentes, évolutions réglementaires. Bénéficiez d'un tableau de bord interactif
          pour visualiser les données essentielles à votre prise de décision.
        </Text>
      </Box>

      <Divider borderColor="gray.200" />

      {/* Détection d'Opportunités */}
      <Box>
        <Heading as="h3" size="md" color="gray.800" mb={4}>
          📌 Détection d'Opportunités d'Affaires
        </Heading>
        <Text color="gray.600" lineHeight="tall">
          Accédez à des appels d'offres, partenariats et nouvelles opportunités commerciales adaptées à
          votre activité. Trouvez en quelques clics les meilleures opportunités pour développer votre entreprise.
        </Text>
      </Box>

      <Divider borderColor="gray.200" />

      {/* Cartographie des Risques */}
      <Box>
        <Heading as="h3" size="md" color="gray.800" mb={4}>
          🌍 Cartographie des Risques et Opportunités
        </Heading>
        <Text color="gray.600" lineHeight="tall">
          Analysez en temps réel les menaces et opportunités qui impactent votre marché. Grâce à notre
          cartographie intelligente, identifiez les tendances émergentes, anticipez les évolutions
          réglementaires et adaptez votre stratégie en fonction des risques géopolitiques et économiques.
        </Text>
      </Box>

      <Divider borderColor="gray.200" />

      {/* Rapports Stratégiques */}
      <Box>
        <Heading as="h3" size="md" color="gray.800" mb={4}>
          📈 Rapports Stratégiques à la Demande
        </Heading>
        <Text color="gray.600" lineHeight="tall">
          Accédez à des analyses approfondies sur les tendances du marché et les dynamiques internationales.
          Nos rapports sur mesure vous offrent une vision claire des opportunités de croissance, des
          évolutions sectorielles et des prévisions stratégiques, pour une expansion optimisée.
        </Text>
      </Box>

      <Text fontSize="xl" color="teal.600" fontWeight="bold" textAlign="center">
        🚀 Intelligentsia, transformez l'information en décision et prenez une longueur d'avance sur votre marché.
      </Text>
    </VStack>

  </>
  );
};

export default Actions;
