import { Text, Box, VStack, Divider, HStack } from '@chakra-ui/react';
import { ACTIONS, CONCLUSION } from '../../constantes';

export const Actions = () => {
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
        {ACTIONS.map((action, index) => (
          <Box key={index}>
            <Text fontWeight="bold" fontSize="xl" textAlign="left" color="gray.800" mb={2}>
              {action.title}
            </Text>
            <Text color="gray.600" textAlign="left" lineHeight="tall" mb={4}>
              {action.description}
            </Text>
            <Divider borderColor="gray.200" />
          </Box>
        ))}
        <Text fontSize="xl" fontWeight="bold" textAlign="center" mt={12}>
          {CONCLUSION}
        </Text>
      </VStack>
    </HStack>
  );
};

export default Actions;
