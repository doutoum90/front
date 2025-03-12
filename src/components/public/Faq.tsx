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
  const FAQ = [
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
  return (
    <VStack spacing={12} bg="gray.100" mt={0} pt={12} pl={120} pr={120}>
      <Text fontSize="lg" color="gray.600">
        Une question ? Nous avons la réponse !
      </Text>

      <Text fontSize="lg" color="gray.600">
        Découvrez tout ce qu'il faut savoir sur Intelligentsia et maximisez votre expérience.
      </Text>

      <Accordion allowToggle>
        {/* Section Abonnement & Tarification */}
        <AccordionItem border="none" mb={4}>
          {FAQ.map((faq) => (
            <>
              <AccordionButton
                _hover={{ bg: 'teal.50' }}
                py={4}
                borderRadius="md"
              >
                <Box flex="1" textAlign="left" fontSize="lg" fontWeight="semibold">
                  {faq.title}
                </Box>
                <AccordionIcon color="teal.600" />
              </AccordionButton>

              <AccordionPanel pb={4} bg="teal.50" borderRadius="md">
                <VStack spacing={4} align="stretch">
                  {faq.questions.map((question) => (
                    <Box>
                      <Text fontWeight="600" textAlign="left">{question.question}</Text>
                      <Text color="gray.600" textAlign="left">
                        {question.reponse}
                      </Text>
                    </Box>
                  ))}
                </VStack>
              </AccordionPanel>
            </>
          ))}
        </AccordionItem>
      </Accordion>
    </VStack>
  );
};

export default Faq;