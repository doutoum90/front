import { Text, Button, Box, HStack, VStack } from '@chakra-ui/react';
import { TITLES, HOME_PARAGRAPHS as PARAGRAPHS } from '../../constantes';

const Home = () => {



  return (
    <>
      <VStack width="100%" spacing={12} bg="gray.100" mt={0} pt={12} px={{ base: 4, md: 8 }}>
        <Box textAlign="center">
          <Text as="h6" size="lg" mb={6} color="gray.800">
            {TITLES.title}
          </Text>
          <HStack spacing={8} justify="center">
            <Text>{TITLES.subtitle1}</Text>
            <Text>{TITLES.subtitle2}</Text>
            <Text>{TITLES.subtitle3}</Text>
          </HStack>
        </Box>
        <HStack
          spacing={0} // Supprimer l'espacement entre les blocs
          borderRadius="xl"
          width="100%"
          align="stretch"
        >
          <VStack width="80%"
            alignItems="flex-start" textAlign="left">
            {PARAGRAPHS.map((paragraph) => (
              <>
                <Text size="md" fontWeight="bold" fontSize="xl">
                  {paragraph.title}
                </Text>
                <Text lineHeight="tall" color="gray.600" mb={4}>
                  {paragraph.description}
                </Text>
              </>
            ))}
          </VStack>
          <VStack
            pt={12}
            justifyContent="center"
            alignItems="center"
            height="100%">
            <Button
              bg="#3d84a8"
              color="white"
              whiteSpace="pre-line"
              height="auto"
              minHeight="48px"
              px={4}
              py={6}
              borderRadius="2xl"
              _hover={{ transform: 'scale(1.05)' }}
              transition="all 0.2s"
            >
              {"Démarrer tout de suite\nvotre essai gratuit"}
            </Button>
          </VStack>
        </HStack>
      </VStack>
    </>
  );
};

export default Home;