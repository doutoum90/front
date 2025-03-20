import { Flex, Heading, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { FaChartLine, FaChartPie, FaFilter, FaDollarSign, FaCalendarAlt } from 'react-icons/fa';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryBar } from 'victory';
import { useMarketData } from '../../hooks/useMarketData';
import { ChartCard } from '../common/ChartCard';
import { PeriodFilter } from '../common/PeriodFilter';
import { MarketShareProgress } from '../common/MarketShareProgress';
import { MarketData } from '../../types';

const iconColors = ['brand.500', 'purple.500', 'orange.500', 'blue.500'];

const VeilleConcurrentielle = () => {
    const { selectedPeriod, setSelectedPeriod, marketTrends, marketShare, priceEvolution, loading, error } = useMarketData('30j');


    if (loading) {
        return (
            <Flex justify="center" align="center" minH="100vh">
                <Spinner size="xl" color="brand.500" />
            </Flex>
        );
    }

    if (error) {
        return (
            <Alert status="error" variant="subtle" flexDirection="column" alignItems="center">
                <AlertIcon boxSize="40px" mr={0} />
                <Heading mt={4} mb={1} fontSize="lg">
                    {error}
                </Heading>
            </Alert>
        );
    }

    return (
        <Flex p={8} minH="100vh" direction="column" gap={8}>
            <Heading size="xl" display="flex" alignItems="center" gap={3}>
                <FaCalendarAlt /> Analyse de Marché en Temps Réel
            </Heading>

            <Flex direction={{ base: 'column', lg: 'row' }} gap={6} wrap="wrap">
                <ChartCard
                    title="Période d'Analyse"
                    icon={FaFilter}
                    iconColor={iconColors[0]}
                    tooltip="Choisissez la période des données"
                    flex="1"
                    minW={{ base: '100%', md: '300px' }}
                >
                    <PeriodFilter selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />
                </ChartCard>

                <ChartCard
                    title="Évolution du Marché"
                    icon={FaChartLine}
                    iconColor={iconColors[1]}
                    tooltip="Tendances du marché sur la période sélectionnée"
                    flex="2"
                    minW={{ base: '100%', md: '400px' }}
                >
                    <VictoryChart theme={VictoryTheme.material} height={200}>
                        <VictoryLine
                            data={marketTrends}
                            x={(d: MarketData) => d.date}
                            y={(d: MarketData) => d.value}
                            style={{ data: { stroke: '#4FD1C5' } }}
                            animate={{ duration: 2000 }}
                        />
                    </VictoryChart>
                </ChartCard>

                <ChartCard
                    title="Répartition du Marché"
                    icon={FaChartPie}
                    iconColor={iconColors[2]}
                    tooltip="Parts de marché des principaux acteurs"
                    flex="1"
                    minW={{ base: '100%', md: '300px' }}
                >
                    <MarketShareProgress data={marketShare} />
                </ChartCard>

                <ChartCard
                    title="Dynamique des Prix"
                    icon={FaDollarSign}
                    iconColor={iconColors[3]}
                    tooltip="Évolution des prix sur la période"
                    flex="2"
                    minW={{ base: '100%', md: '400px' }}
                >
                    <VictoryChart domainPadding={20} height={200}>
                        <VictoryBar
                            data={priceEvolution}
                            x={(d: MarketData) => d.date}
                            y={(d: MarketData) => d.value}
                            style={{ data: { fill: '#4299E1' } }}
                            animate={{ duration: 2000 }}
                        />
                    </VictoryChart>
                </ChartCard>
            </Flex>
        </Flex>
    );
};

export default VeilleConcurrentielle;