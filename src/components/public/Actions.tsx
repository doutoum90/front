import { Text, Box, VStack, Divider } from '@chakra-ui/react';
import { ACTIONS, CONCLUSION } from '../../constantes';

export const Actions = () => {
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
