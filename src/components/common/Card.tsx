import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface CardProps {
  hoverable?: boolean;
  motionTransition?: {
    duration?: number;
    ease?: string;
    delay?: number;
  };
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Card = ({ hoverable, children, motionTransition = { duration: 0.3 }, style, ...props }: CardProps) => {
  const MotionBox = motion(Box);
  return (
    <MotionBox
      as="section"
      whileHover={hoverable ? { y: -5, scale: 1.02 } : {}}
      transition={motionTransition}
      style={{
        ...style,
        borderRadius: '8px',
        boxShadow: 'md',
      }}
      {...props}
    >
      {children}
    </MotionBox>
  );
};
