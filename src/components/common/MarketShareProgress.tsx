import { Box, Flex, Text, Progress } from '@chakra-ui/react';
import { MarketShare } from '../../types';

interface MarketShareProgressProps {
    data: MarketShare[];
    colorSchemes?: string[];
}

export const MarketShareProgress = ({
    data,
    colorSchemes = ['teal', 'purple', 'orange', 'blue'],
}: MarketShareProgressProps) => (
    <>
        {data.map((item, index) => (
            <Box key={`${item.company}-${index}`} mb={4}>
                <Flex justify="space-between" mb={2}>
                    <Text>{item.company}</Text>
                    <Text fontWeight="bold">{item.value}%</Text>
                </Flex>
                <Progress
                    value={item.value}
                    colorScheme={colorSchemes[index % colorSchemes.length]}
                    borderRadius="full"
                />
            </Box>
        ))}
    </>
);