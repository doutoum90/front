import { Text, Button, Box, HStack, VStack } from '@chakra-ui/react';
import { TITLES, HOME_PARAGRAPHS as PARAGRAPHS } from '../../constantes';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
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
          spacing={0}
          borderRadius="xl"
          width="100%"
          align="stretch"
        >
          <VStack width="80%"
            alignItems="flex-start" textAlign="left">
            {PARAGRAPHS.map((paragraph, index) => (
              <>
                <Text size="md" fontWeight="bold" fontSize="xl" key={index}>
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
              onClick={() => navigate('/free-trial')}
            >
              {"Démarrer tout de suite\nvotre essai gratuit"}
            </Button>
          </VStack>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default Home;