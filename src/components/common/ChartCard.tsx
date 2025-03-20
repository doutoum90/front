import { Box, Flex, Heading, Icon, Tooltip } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface ChartCardProps {
    title: string;
    icon: React.ElementType;
    iconColor?: string;
    tooltip?: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
    flex?: string;
    minW?: any;
}

const MotionBox = motion(Box);

export const ChartCard = ({ title, icon, iconColor = 'teal.500', tooltip, children, style, flex = '1', minW = '100%', ...props }: ChartCardProps) => (
    <Tooltip label={tooltip || title} placement="top">
        <MotionBox
            as="section"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            cursor="default"
            style={{
                ...style,
                borderRadius: '8px',
                boxShadow: 'md',
                flex,
                minWidth: minW,
            }}
            {...props}
        >
            <Flex align="center" mb={4}>
                <Icon as={icon} w={8} h={8} color={iconColor} mr={4} />
                <Heading size="md">{title}</Heading>
            </Flex>
            {children}
        </MotionBox>
    </Tooltip>
);