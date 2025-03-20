import { Tabs, TabList, TabPanels, Tab, TabPanel, VStack, Tooltip } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface TabPanelLayoutProps {
  tabs: { label: string; icon: React.ElementType; content: React.ReactNode; tooltip?: string }[];
}

const MotionTab = motion(Tab);

export const TabPanelLayout = ({ tabs }: TabPanelLayoutProps) => (
  <Tabs variant="enclosed" colorScheme="brand" isFitted>
    <TabList>
      {tabs.map((tab, index) => (
        <Tooltip key={index} label={tab.tooltip || tab.label} placement="top">
          <MotionTab
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <tab.icon /> {tab.label}
          </MotionTab>
        </Tooltip>
      ))}
    </TabList>
    <TabPanels mt={6}>
      {tabs.map((tab, index) => (
        <TabPanel key={index}>
          <VStack spacing={6} maxW="600px">
            {tab.content}
          </VStack>
        </TabPanel>
      ))}
    </TabPanels>
  </Tabs>
);