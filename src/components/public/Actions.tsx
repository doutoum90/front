import { Heading, Text, Button } from '@chakra-ui/react';

export const Actions = () => {
  return (<>
    <Heading size="2xl" color="teal.600" mb="4">
      À propos de notre application
    </Heading>
    <Text fontSize="lg" color="gray.600" mb="6">
      Notre application est conçue pour offrir une expérience utilisateur exceptionnelle.
      Nous nous engageons à fournir des fonctionnalités de qualité et un support client réactif.
    </Text>
    <Button colorScheme="teal" size="lg" onClick={() => alert('Merci de votre intérêt !')}>
      En savoir plus
    </Button>
  </>
  );
};

export default Actions;
