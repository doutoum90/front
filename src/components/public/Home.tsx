import { Heading, Text, Button, Container, Stack, SimpleGrid, Card, CardBody, CardHeader, useBreakpointValue, Image, Box } from '@chakra-ui/react';

const Home = () => {
  const columnSize = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  return (
    <>
      <Container maxW="100%" p={0}>
        <Stack
          spacing={{ base: 4, md: 6 }}
          textAlign="center"
          mb={{ base: '6', md: '12' }}
          px={{ base: '4', md: '8' }}
        >
          <Heading size="2xl" color="teal.600">
            Bienvenue sur notre application !
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Explorez nos fonctionnalités et commencez votre aventure dès maintenant.
          </Text>
          <Button colorScheme="teal" size="lg" mt="4" onClick={() => alert('Explorez maintenant !')}>
            Commencer
          </Button>
        </Stack>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: columnSize }}
          spacing="8"
          px={{ base: '4', md: '8' }}
        >
          <Card width="100%" boxShadow="lg" borderRadius="md">
            <CardHeader>
              <Heading size="md" color="teal.500">
                Une expérience fluide
              </Heading>
            </CardHeader>
            <CardBody>
              <Text color="gray.600">
                Profitez d'une interface simple et fluide, conçue pour vous offrir une expérience optimale.
              </Text>
            </CardBody>
          </Card>

          <Card width="100%" boxShadow="lg" borderRadius="md">
            <CardHeader>
              <Heading size="md" color="teal.500">
                Performances incroyables
              </Heading>
            </CardHeader>
            <CardBody>
              <Text color="gray.600">
                Nous mettons l'accent sur la rapidité et la performance pour vous offrir la meilleure expérience.
              </Text>
            </CardBody>
          </Card>

          <Card width="100%" boxShadow="lg" borderRadius="md">
            <CardHeader>
              <Heading size="md" color="teal.500">
                Une interface réactive
              </Heading>
            </CardHeader>
            <CardBody>
              <Text color="gray.600">
                Votre application sera belle et fonctionnelle sur tous les appareils.
              </Text>
            </CardBody>
          </Card>
        </SimpleGrid>

        <Box mt="12" display="flex" justifyContent="center" px={{ base: '4', md: '8' }}>
          <Image
            src="https://via.placeholder.com/600x400"
            width="100%"
            maxW="1200px"
            alt="Illustration"
            borderRadius="md"
            shadow="lg"
          />
        </Box>
      </Container>
    </>
  );
};

export default Home;