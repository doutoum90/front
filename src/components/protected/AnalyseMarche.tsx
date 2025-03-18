import {
    Flex,
    Box,
    Text,
    Select,
    VStack,
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
    Heading,
    SimpleGrid // Ajout de SimpleGrid
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
        <Flex minH="100vh" direction="column" p={8}>
            <Box mb={8}>
                <Heading size="xl" color="teal.600">
                    Analyse de Marchés
                </Heading>
            </Box>

            <Flex justify="flex-end" mb={8}>
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

            <SimpleGrid 
                columns={{ base: 1, md: 2 }} 
                spacing={6}
                alignItems="stretch"
            >
                {/* Bloc Statistiques */}
                <Box bg={sidebarBg} p={6} borderRadius="xl" boxShadow="md">
                    <VStack spacing={6} align="stretch">
                        <Text fontSize="xl" fontWeight="bold">Indicateurs clés</Text>
                        
                        <SimpleGrid columns={2} spacing={4}>
                            <Stat p={4} bg={contentBg} borderRadius="lg">
                                <StatLabel>Parts de marché</StatLabel>
                                <StatNumber>24.7%</StatNumber>
                                <Text fontSize="sm" color="green.500">+2.4% vs mois dernier</Text>
                            </Stat>

                            <Stat p={4} bg={contentBg} borderRadius="lg">
                                <StatLabel>Évolution des prix</StatLabel>
                                <StatNumber>+5.8%</StatNumber>
                                <Text fontSize="sm" color="red.500">Moyenne secteur: +3.2%</Text>
                            </Stat>
                        </SimpleGrid>
                    </VStack>
                </Box>

                {/* Bloc Tableau */}
                <Box 
                    bg={sidebarBg} 
                    p={6} 
                    borderRadius="xl" 
                    boxShadow="md"
                    mt={{ base: 6, md: 0 }}
                >
                    <Text fontSize="xl" fontWeight="bold" mb={4}>Échappé</Text>
                    <TableContainer>
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
            </SimpleGrid>

            {/* Section inférieure */}
            <SimpleGrid 
                columns={{ base: 1, md: 2 }} 
                spacing={6} 
                mt={8}
            >
                {[
                    { title: 'Tendances du marché', content: 'Analyse des tendances actuelles...' },
                    { title: 'Parts de marché', content: 'Répartition des parts...' },
                    { title: 'Évolution des prix', content: 'Historique des prix...' },
                    { title: 'Analyse concurrentielle', content: 'Comparaison des acteurs...' }
                ].map((item, index) => (
                    <Box 
                        key={index}
                        bg={sidebarBg}
                        p={6}
                        borderRadius="xl"
                        boxShadow="md"
                    >
                        <Heading size="md" mb={4}>{item.title}</Heading>
                        <Text>{item.content}</Text>
                    </Box>
                ))}
            </SimpleGrid>
        </Flex>
    );
};

export default AnalyseMarche;