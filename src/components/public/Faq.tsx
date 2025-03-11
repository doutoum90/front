import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Box,
  VStack,
  Heading
} from "@chakra-ui/react";

export const Faq = () => {
  return (
    <VStack spacing={12} align="stretch" width={"100%"} textAlign="left">
      <Heading size="xl" color="teal.600" mb={4}>
        Une question ? Nous avons la réponse !
      </Heading>

      <Text fontSize="lg" color="gray.600">
        Découvrez tout ce qu'il faut savoir sur Intelligentsia et maximisez votre expérience.
      </Text>

      <Accordion allowToggle>
        {/* Section Abonnement & Tarification */}
        <AccordionItem border="none" mb={4}>
          <AccordionButton
            _hover={{ bg: 'teal.50' }}
            py={4}
            borderRadius="md"
          >
            <Box flex="1" textAlign="left" fontSize="lg" fontWeight="semibold">
              Abonnement & Tarification
            </Box>
            <AccordionIcon color="teal.600" />
          </AccordionButton>

          <AccordionPanel pb={4} bg="teal.50" borderRadius="md">
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontWeight="600">Q1 : Quels sont les moyens de paiement acceptés ?</Text>
                <Text color="gray.600">
                  Nous acceptons les paiements par carte bancaire (Visa, Mastercard, AMEX) et virement bancaire pour les abonnements annuels.
                </Text>
              </Box>

              <Box>
                <Text fontWeight="600">Q2 : Puis-je changer de formule en cours d'abonnement ?</Text>
                <Text color="gray.600">
                  Oui, vous pouvez passer à une offre supérieure ou inférieure à tout moment via votre espace client.
                </Text>
              </Box>

              <Box>
                <Text fontWeight="600">Q3 : Y a-t-il une période d'essai gratuite ?</Text>
                <Text color="gray.600">
                  Oui, nous offrons un essai gratuit de 14 jours pour vous permettre de tester toutes les fonctionnalités.
                </Text>
              </Box>
            </VStack>
          </AccordionPanel>
        </AccordionItem>

        {/* Section Fonctionnalités & Utilisation */}
        <AccordionItem border="none">
          <AccordionButton
            _hover={{ bg: 'teal.50' }}
            py={4}
            borderRadius="md"
          >
            <Box flex="1" textAlign="left" fontSize="lg" fontWeight="semibold">
              Fonctionnalités & Utilisation
            </Box>
            <AccordionIcon color="teal.600" />
          </AccordionButton>

          <AccordionPanel pb={4} bg="teal.50" borderRadius="md">
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontWeight="600">Q4 : Comment fonctionne la veille concurrentielle ?</Text>
                <Text color="gray.600">
                  Notre IA analyse en continu les évolutions du marché et vous envoie des alertes personnalisées.
                </Text>
              </Box>

              <Box>
                <Text fontWeight="600">Q5 : Les rapports sont-ils personnalisés ?</Text>
                <Text color="gray.600">
                  Oui, vous pouvez choisir les données et les indicateurs clés que vous souhaitez inclure dans vos rapports.
                </Text>
              </Box>

              <Box>
                <Text fontWeight="600">Q6 : Comment accéder aux analyses de tendances marché ?</Text>
                <Text color="gray.600">
                  Les analyses sont disponibles directement depuis votre tableau de bord et mises à jour en temps réel.
                </Text>
              </Box>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </VStack>
  );
};

export default Faq;