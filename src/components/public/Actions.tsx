import { Text, Box, VStack, Divider } from '@chakra-ui/react';

export const Actions = () => {
  const ACTIONS = [
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
  const CONCLUSION = "🚀 Avec Intelligentsia, transformez l'information en décision et prenez une longueur d'avance sur votre marché."
  return (<>
    <VStack spacing={12} bg="gray.100" mt={0} pt={12} pl={120} pr={120}>
      <Box>
        {ACTIONS.map((action, index) => (
          <>
            <Box key={index}>
              <Text fontWeight="bold" fontSize="xl" textAlign="left" color="gray.800" mb={2}>
                {action.title}
              </Text>
              <Text color="gray.600" textAlign="left" lineHeight="tall" mb={4}>
                {action.description}
              </Text>
            </Box>
            <Divider borderColor="gray.200" />
          </>
        ))}
      </Box>



      <Text fontSize="xl" fontWeight="bold" textAlign="center" mt={12}>
        {CONCLUSION}
      </Text>
    </VStack>

  </>
  );
};

export default Actions;
