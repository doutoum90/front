import { Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, VStack, HStack } from '@chakra-ui/react';
import { PARAGRAPHS, ABOUT_TITLES } from '../../constantes';

export const About = () => {
  return (
    <HStack
      spacing={0}
      width="100%"
      maxWidth="100vw"
      pt={12}
      px={{ base: 4, md: 8 }}
    >
      <VStack
        width="100%"
        maxWidth="container.xl"
        marginX="auto"
      >
        <Text fontSize="lg" color="gray.600" textAlign="center">
          {ABOUT_TITLES.title}
        </Text>

        <Text fontSize="lg" color="gray.600" textAlign="center">
          {ABOUT_TITLES.subtitle}
        </Text>

        <Accordion allowToggle w="100%">
          {PARAGRAPHS.map((paragraph, index ) => (
            <AccordionItem border="none" mb={4} key={index}>
              <AccordionButton
                _hover={{ bg: 'teal.50' }}
                py={6}
                borderRadius="md"
              >
                <Box flex="1" textAlign="left" fontSize="xl" fontWeight="semibold">
                  {paragraph.title}
                </Box>
                <AccordionIcon color="teal.600" boxSize={8} />
              </AccordionButton>

              <AccordionPanel pb={4} bg="teal.50" borderRadius="md">
                <VStack spacing={6} align="stretch">
                  {paragraph.sousParagraphs.map((sousParagraph, sousIndex) => (
                    <Box key={sousIndex}>
                      <Text fontWeight="600" fontSize="lg" color="teal.700" textAlign="left">{sousParagraph.title}</Text>
                      <Text color="gray.600" mt={2} textAlign="left">
                        {sousParagraph.description}
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

export default About;
