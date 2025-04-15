import { Box, Flex, Heading, Spinner, Alert, AlertIcon, useColorModeValue } from '@chakra-ui/react';
import { FaChartLine, FaChartPie, FaFilter, FaDollarSign, FaCalendarAlt } from 'react-icons/fa';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryBar, VictoryLegend, VictoryAxis, VictoryTooltip } from 'victory';
import { useMarketData } from '../../hooks/useMarketData';
import { ChartCard } from '../common/ChartCard';
import { PeriodFilter } from '../common/PeriodFilter';
import { MarketShareProgress } from '../common/MarketShareProgress';
import { MarketData } from '../../types';
import GestionConcurrents from './GestionConcurrents';
import { useMemo, useCallback } from 'react';

const VeilleConcurrentielle = () => {
    const { selectedPeriod, setSelectedPeriod, marketTrends, marketShare, priceEvolution, loading, error } = useMarketData('30j');
    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const gridColor = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)');

    const chartTheme = useMemo(() => ({
        ...VictoryTheme.material,
        axis: {
            ...(VictoryTheme.material?.axis ?? {}),
            style: {
                ...(VictoryTheme.material?.axis?.style ?? {}),
                grid: {
                    ...(VictoryTheme.material?.axis?.style?.grid ?? {}),
                    stroke: gridColor
                }
            }
        }
    }), [gridColor]);

    const handlePeriodChange = useCallback((newPeriod: string) => {
        setSelectedPeriod(newPeriod);
    }, [setSelectedPeriod]);

    const chartConfig = useMemo(() => ({
        height: 280,
        padding: { top: 40, bottom: 50, left: 50, right: 50 },
        domainPadding: { y: 20 },
        animate: { duration: 2000, onLoad: { duration: 1000 } }
    }), []);

    const axisStyle = useMemo(() => ({
        tickLabels: { fontSize: 10, angle: -45 }
    }), []);

    if (loading) {
        return (
            <Flex justify="center" align="center" minH="100vh">
                <Spinner size="xl" color="brand.500" thickness="4px" />
            </Flex>
        );
    }

    if (error) {
        return (
            <Alert status="error" variant="subtle" flexDirection="column" alignItems="center" p={6} borderRadius="lg">
                <AlertIcon boxSize="40px" mr={0} />
                <Heading mt={4} mb={1} fontSize="lg">
                    {error}
                </Heading>
            </Alert>
        );
    }

    return (
        <Box p={6}>
            <Flex 
                direction="column" 
                gap={8} 
                maxW="1400px" 
                mx="auto"
                bg={bgColor}
                borderRadius="xl"
                boxShadow="sm"
                p={6}
            >
                <Heading 
                    size="xl" 
                    display="flex" 
                    alignItems="center" 
                    gap={3}
                    color="brand.600"
                    pb={4}
                    borderBottom="2px"
                    borderColor={borderColor}
                >
                    <FaCalendarAlt /> Analyse de Marché en Temps Réel
                </Heading>

                <Flex direction={{ base: 'column', lg: 'row' }} gap={6}>
                    <Box 
                        flex="1" 
                        p={6} 
                        bg={bgColor} 
                        borderRadius="lg" 
                        boxShadow="md"
                        border="1px"
                        borderColor={borderColor}
                    >
                        <GestionConcurrents />
                    </Box>
                </Flex>

                <Flex direction={{ base: 'column', lg: 'row' }} gap={6} wrap="wrap">
                    <ChartCard
                        title="Période d'Analyse"
                        icon={FaFilter}
                        iconColor="brand.500"
                        tooltip="Choisissez la période des données"
                        flex="1"
                        minW={{ base: '100%', md: '300px' }}
                    >
                        <Box p={4}>
                            <PeriodFilter selectedPeriod={selectedPeriod} onPeriodChange={handlePeriodChange} />
                        </Box>
                    </ChartCard>

                    <ChartCard
                        title="Tendances du Marché"
                        icon={FaChartLine}
                        iconColor="purple.500"
                        tooltip="Tendances du marché sur la période sélectionnée"
                        flex="2"
                        minW={{ base: '100%', md: '500px' }}
                    >
                        <Box p={4} h="300px">
                            <VictoryChart 
                                theme={chartTheme} 
                                {...chartConfig}
                            >
                                <VictoryAxis 
                                    tickFormat={(t) => new Date(t).toLocaleDateString('fr-FR')}
                                    style={axisStyle}
                                />
                                <VictoryAxis dependentAxis />
                                <VictoryLegend
                                    x={50}
                                    y={0}
                                    orientation="horizontal"
                                    style={{ labels: { fontSize: 12 } }}
                                    data={[
                                        { name: "Tendance", symbol: { fill: "#805AD5" } },
                                    ]}
                                />
                                <VictoryLine
                                    data={marketTrends.filter(d => typeof d.value === 'number' && isFinite(d.value))}
                                    x={(d: MarketData) => d.date}
                                    y={(d: MarketData) => d.value}
                                    style={{ 
                                        data: { 
                                            stroke: "#805AD5",
                                            strokeWidth: 3
                                        }
                                    }}
                                    animate={chartConfig.animate}
                                    labelComponent={<VictoryTooltip />}
                                />
                            </VictoryChart>
                        </Box>
                    </ChartCard>

                    <ChartCard
                        title="Parts de Marché"
                        icon={FaChartPie}
                        iconColor="orange.500"
                        tooltip="Parts de marché des principaux acteurs"
                        flex="1.5"
                        minW={{ base: '100%', md: '400px' }}
                    >
                        <Box p={4} h="300px" overflowY="auto">
                            <MarketShareProgress data={marketShare} />
                        </Box>
                    </ChartCard>

                    <ChartCard
                        title="Évolution des Prix"
                        icon={FaDollarSign}
                        iconColor="blue.500"
                        tooltip="Évolution des prix sur la période"
                        flex="2"
                        minW={{ base: '100%', md: '500px' }}
                    >
                        <Box p={4} h="300px">
                            <VictoryChart 
                                theme={chartTheme}
                                {...chartConfig}
                                domainPadding={{ x: 20 }}
                            >
                                <VictoryAxis 
                                    tickFormat={(t) => new Date(t).toLocaleDateString('fr-FR')}
                                    style={axisStyle}
                                />
                                <VictoryAxis dependentAxis />
                                <VictoryLegend
                                    x={50}
                                    y={0}
                                    orientation="horizontal"
                                    style={{ labels: { fontSize: 12 } }}
                                    data={[
                                        { name: "Prix", symbol: { fill: "#4299E1" } },
                                    ]}
                                />
                                <VictoryBar
                                    data={priceEvolution.filter(d => typeof d.value === 'number' && isFinite(d.value))}
                                    x={(d: MarketData) => d.date}
                                    y={(d: MarketData) => d.value}
                                    style={{ 
                                        data: { 
                                            fill: "#4299E1",
                                            width: 20
                                        }
                                    }}
                                    animate={chartConfig.animate}
                                    labelComponent={<VictoryTooltip />}
                                />
                            </VictoryChart>
                        </Box>
                    </ChartCard>
                </Flex>
            </Flex>
        </Box>
    );
};

export default VeilleConcurrentielle;