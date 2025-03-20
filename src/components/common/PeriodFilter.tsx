import { Flex, Tag } from '@chakra-ui/react';

interface PeriodFilterProps {
    selectedPeriod: string;
    onPeriodChange: (period: string) => void;
    periods?: string[];
}

export const PeriodFilter = ({
    selectedPeriod,
    onPeriodChange,
    periods = ['24h', '7j', '30j', '1a'],
}: PeriodFilterProps) => (
    <Flex wrap="wrap" gap={2}>
        {periods.map((period) => (
            <Tag
                key={period}
                colorScheme={period === selectedPeriod ? 'brand' : 'gray'}
                px={4}
                py={2}
                _hover={{ bg: 'brand.100' }}
                cursor="pointer"
                onClick={() => onPeriodChange(period)}
            >
                {period}
            </Tag>
        ))}
    </Flex>
);