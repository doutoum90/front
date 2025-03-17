import {
    Flex,
    Box,
    Text,
    Select,
    VStack,
    HStack,
    Stat,
    StatLabel,
    StatNumber,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    useColorModeValue,
} from '@chakra-ui/react';

import { useState } from 'react';

const AnalyseMarche = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('last-month');
    const sidebarBg = useColorModeValue('white', 'gray.800');
    const contentBg = useColorModeValue('gray.50', 'gray.900');
    const tableRowHover = { bg: useColorModeValue('gray.100', 'gray.700') };

    const tableData = [
        { f1: 1, f2: 2, f3: 3, f4: 4, f5: 5 },
        { f1: 8, f2: 6, f3: 7, f4: 8, f5: 9 }
    ];


    return (
        <Flex minH="100vh">
            <Box
                ml="280px"
                flex={1}
                p={8}
                bg={contentBg}
                minH="100vh"
            >
                <VStack spacing={8} align="stretch">
                    {/* Filter Section */}
                    <Flex justify="flex-end">
                        <Select
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            w="200px"
                        >
                            <option value="last-month">Dernier mois</option>
                            <option value="last-week">Semaine dernière</option>
                            <option value="last-year">Année dernière</option>
                        </Select>
                    </Flex>

                    {/* Market Trends */}
                    <VStack spacing={6} align="stretch">
                        <Text fontSize="2xl" fontWeight="bold">Tendances du marché</Text>

                        <HStack spacing={8}>
                            <Stat p={6} bg={sidebarBg} borderRadius="lg">
                                <StatLabel>Parts de marché</StatLabel>
                                <StatNumber>24.7%</StatNumber>
                                <Text fontSize="sm" color="green.500">+2.4% vs mois dernier</Text>
                            </Stat>

                            <Stat p={6} bg={sidebarBg} borderRadius="lg">
                                <StatLabel>Évolution des prix</StatLabel>
                                <StatNumber>+5.8%</StatNumber>
                                <Text fontSize="sm" color="red.500">Moyenne secteur: +3.2%</Text>
                            </Stat>
                        </HStack>
                    </VStack>

                    {/* Table Section */}
                    <Box mt={8}>
                        <Text fontSize="xl" fontWeight="bold" mb={4}>Échappé</Text>
                        <TableContainer
                            bg={sidebarBg}
                            borderRadius="lg"
                            boxShadow="md"
                        >
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        {['F1', 'F2', 'F3', 'F4', 'F5'].map((header) => (
                                            <Th key={header}>{header}</Th>
                                        ))}
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {tableData.map((row, index) => (
                                        <Tr
                                            key={index}
                                            _hover={tableRowHover}
                                            transition="background 0.2s"
                                        >
                                            <Td>{row.f1}</Td>
                                            <Td>{row.f2}</Td>
                                            <Td>{row.f3}</Td>
                                            <Td>{row.f4}</Td>
                                            <Td>{row.f5}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>
                </VStack>
            </Box>
        </Flex>
    );
};

export default AnalyseMarche;