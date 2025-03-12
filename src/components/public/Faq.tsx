import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Box,
  VStack,
  HStack
} from "@chakra-ui/react";
import { FAQ, FAQ_TITLES } from "../../constantes";

export const Faq = () => {
  return (
    <HStack
      spacing={0}
      width="100%"
      maxWidth="100vw"
      pt={120}
      px={{ base: 4, md: 8 }}
    >
      <VStack
        width="100%"
        maxWidth="container.xl"
        marginX="auto"
      >
        <Text fontSize="lg" color="gray.600" textAlign="center">
          {FAQ_TITLES.title}
        </Text>

        <Text fontSize="lg" color="gray.600" textAlign="center">
          {FAQ_TITLES.subtitle}
        </Text>

        <Accordion allowToggle width="100%">

          {FAQ.map((faq, index) => (
            <AccordionItem border="none" mb={4} key={index}>
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
                  {faq.questions.map((question, questionIndex) => (
                    <Box key={questionIndex}>
                      <Text fontWeight="600" textAlign="left">{question.question}</Text>
                      <Text color="gray.600" textAlign="left">
                        {question.reponse}
                      </Text>
                    </Box>
                  ))}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </VStack>
    </HStack>
  );
};

export default Faq;