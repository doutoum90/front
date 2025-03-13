import { Box, Text, Button, Link, Flex } from '@chakra-ui/react';

export const TrialStatusBanner = ({ endDate }: { endDate: Date }) => {
    return (
        <Box bg="blue.50" p={4} borderRadius="md" mb={6}>
            <Flex justify="space-between" align="center">
                <Text>
                    ⏳ Votre essai gratuit expire le {endDate.toLocaleDateString('fr-FR')}
                </Text>
                <Button
                    colorScheme="blue"
                    size="sm"
                    as={Link}
                    href="/subscription"
                >
                    Choisir un abonnement
                </Button>
            </Flex>
        </Box>
    );
};