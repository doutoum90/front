import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    Stack,
    Table,
    Tbody,
    Td,
    Text,
    Textarea,
    Th,
    Thead,
    Tr,
    useToast,
    VStack
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Competitor, DataSource, DataSourceType } from '../../types/competitor';
import { AddCompetitorDataSourceDto } from '../../types/dtos';
import { MarketWatchService } from '../../services/marketWatch.service';

interface NewCompetitor {
    name: string;
    description: string;
    domain: string;
    keywords: string[];
    industry: string;
}

const GestionConcurrents = () => {
    const [competitors, setCompetitors] = useState<Competitor[]>([]);
    const [mode, setMode] = useState<'add' | 'edit'>('add');
    const [newCompetitor, setNewCompetitor] = useState<NewCompetitor>({
        name: '',
        description: '',
        domain: '',
        keywords: [],
        industry: '',
    });
    const [newDataSource, setNewDataSource] = useState<AddCompetitorDataSourceDto>({
        type: DataSourceType.website,
        url: '',
        description: '',
    });

    const toast = useToast();

    const handleAddCompetitor = async () => {
        try {
            if (!newCompetitor.name) throw new Error('Le nom du concurrent est requis');
            const addedCompetitor = await MarketWatchService.createCompetitor(
                newCompetitor.name,
                newCompetitor.description,
                newCompetitor.domain,
                newCompetitor.keywords,
                newCompetitor.industry
            );
            setCompetitors([...competitors, addedCompetitor]);
            setNewCompetitor({ name: '', description: '', domain: '', keywords: [], industry: '' });
            toast({
                title: 'Succès',
                description: 'Concurrent ajouté avec succès',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Erreur',
                description: 'Erreur lors de la création du concurrent',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleAddDataSource = async (competitorId: string) => {
        try {
            if (!newDataSource.url) throw new Error("L'URL de la source est requise");
            if (mode === 'add') {
                const addedCompetitor: Competitor = await MarketWatchService.addDataSource(competitorId, newDataSource);
                const updatedCompetitors = competitors.map(competitor =>
                    competitor.id === competitorId ? addedCompetitor : competitor
                );
                setCompetitors(updatedCompetitors);
            } else {
                const updatedCompetitor: Competitor = await MarketWatchService.updateDataSource(competitorId, newDataSource.id || '', newDataSource);
                const updatedCompetitors = competitors.map(competitor =>
                    competitor.id === competitorId ? updatedCompetitor : competitor
                );
                setCompetitors(updatedCompetitors);
                setMode('add');
            }

            setNewDataSource({
                type: DataSourceType.website,
                url: '',
                description: '',
            });

            toast({
                title: 'Succès',
                description: mode === 'add' ? 'Source ajoutée avec succès' : 'Source modifiée avec succès',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Erreur',
                description: mode === 'add' ? 'Erreur lors de l\'ajout de la source' : 'Erreur lors de la modification de la source',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleDeleteDataSource = async (competitorId: string, dataSourceId: string) => {
        try {
            const updatedCompetitor: Competitor = await MarketWatchService.removeDataSource(competitorId, dataSourceId);
            setCompetitors(competitors.map(competitor =>
                competitor.id === competitorId ? updatedCompetitor : competitor
            ));
            toast({
                title: 'Succès',
                description: 'Source supprimée avec succès',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Erreur',
                description: 'Erreur lors de la suppression de la source',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const loadToEditDataSource = (competitorId: string, dataSourceId: string) => {
        const dataSource = competitors.find(competitor => competitor.id === competitorId)?.dataSources.find(source => source.id === dataSourceId);
        if (dataSource) {
            setNewDataSource(dataSource);
            setMode('edit');
        }
    }


    const handleDeleteCompetitor = async (competitorId: string) => {
        try {
            await MarketWatchService.deleteCompetitor(competitorId);
            setCompetitors(competitors.filter(c => c.id !== competitorId));
            toast({
                title: 'Succès',
                description: 'Concurrent supprimé avec succès',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Erreur',
                description: 'Erreur lors de la suppression du concurrent',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        const fetchCompetitors = async () => {
            const competitors = await MarketWatchService.getAllCompetitors();
            setCompetitors(competitors);
        };
        fetchCompetitors();
    }, []);

    return (
        <Box p={8}>
            <Heading mb={6}>Gestion des Concurrents</Heading>

            {/* Formulaire d'ajout de concurrent */}
            <Box mb={8} p={4} borderWidth={1} borderRadius="lg" width="100%">
                <Heading size="md" mb={4}>Ajouter un Concurrent</Heading>
                <Stack spacing={4} direction={{ base: 'column', md: 'row' }} flexWrap="wrap">
                    <FormControl isRequired width={{ base: '100%', md: '48%' }}>
                        <FormLabel>Nom du concurrent</FormLabel>
                        <Input
                            value={newCompetitor.name}
                            onChange={(e) => setNewCompetitor({
                                ...newCompetitor,
                                name: e.target.value
                            })}
                            placeholder="Nom du concurrent"
                        />
                    </FormControl>
                    <FormControl width={{ base: '100%', md: '48%' }}>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            value={newCompetitor.description}
                            onChange={(e) => setNewCompetitor({
                                ...newCompetitor,
                                description: e.target.value
                            })}
                            placeholder="Description du concurrent"
                        />
                    </FormControl>
                    <FormControl width={{ base: '100%', md: '48%' }}>
                        <FormLabel>Domaine</FormLabel>
                        <Input
                            value={newCompetitor.domain}
                            onChange={(e) => setNewCompetitor({
                                ...newCompetitor,
                                domain: e.target.value
                            })}
                            placeholder="https://example.com"
                            type="url"
                            pattern="https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)"
                        />
                    </FormControl>
                    <FormControl width={{ base: '100%', md: '48%' }}>
                        <FormLabel>Mots-clés</FormLabel>
                        <Input
                            value={newCompetitor.keywords.join(', ')}
                            onChange={(e) => setNewCompetitor({
                                ...newCompetitor,
                                keywords: e.target.value.split(',').map(keyword => keyword.trim())
                            })}
                            placeholder="Mots-clés du concurrent"
                        />
                    </FormControl>
                    <FormControl width={{ base: '100%', md: '48%' }}>
                        <FormLabel>Secteur d'activité</FormLabel>
                        <Input
                            value={newCompetitor.industry}
                            onChange={(e) => setNewCompetitor({
                                ...newCompetitor,
                                industry: e.target.value
                            })}
                            placeholder="Secteur d'activité du concurrent"
                        />
                    </FormControl>
                    <Button colorScheme="teal" onClick={handleAddCompetitor} width={{ base: '100%', md: '48%' }} mt="auto">
                        Ajouter le concurrent
                    </Button>
                </Stack>
            </Box>

            {/* Liste des concurrents */}
            {competitors.map(competitor => (
                <Box key={competitor.id} mb={6} p={4} borderWidth={1} borderRadius="lg">
                    <Flex justify="space-between" align="center" mb={4}>
                        <VStack align="start" spacing={1}>
                            <Heading size="md">{competitor.name}</Heading>
                            {competitor.description && (
                                <Text color="gray.600">{competitor.description}</Text>
                            )}
                        </VStack>
                        <Button
                            colorScheme="red"
                            size="sm"
                            onClick={() => {
                                if (window.confirm('Êtes-vous sûr de vouloir supprimer ce concurrent ?')) {
                                    handleDeleteCompetitor(competitor.id);
                                }
                            }}
                        >
                            Supprimer
                        </Button>
                    </Flex>

                    {/* Formulaire d'ajout de source */}
                    <Box mb={4} p={4} bg="gray.50" borderRadius="md">
                        <Heading size="sm" mb={4}>Ajouter une source</Heading>
                        <Stack spacing={4} direction={{ base: 'column', md: 'row' }}>
                            <FormControl>
                                <FormLabel>Type</FormLabel>
                                <Select
                                    value={newDataSource.type}
                                    onChange={(e) => setNewDataSource({
                                        ...newDataSource,
                                        type: e.target.value as DataSourceType
                                    })}
                                >
                                    {(Object.values(DataSourceType) as DataSourceType[]).map((type: DataSourceType) => (
                                        <option key={type} value={type}>
                                            {type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>URL</FormLabel>
                                <Input
                                    value={newDataSource.url}
                                    onChange={(e) => setNewDataSource({
                                        ...newDataSource,
                                        url: e.target.value
                                    })}
                                    placeholder="URL de la source"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Input
                                    value={newDataSource.description}
                                    onChange={(e) => setNewDataSource({
                                        ...newDataSource,
                                        description: e.target.value
                                    })}
                                    placeholder="Description de la source"
                                />
                            </FormControl>
                            <Button
                                colorScheme="blue"
                                onClick={() => handleAddDataSource(competitor.id)}
                                alignSelf="flex-end"
                                width={{ base: '100%', md: '48%' }}
                            >
                                {mode === 'add' ? 'Ajouter' : 'Modifier'}
                            </Button>
                        </Stack>
                    </Box>

                    {/* Table des sources */}
                    {competitor.dataSources?.length > 0 && (
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Type</Th>
                                    <Th>URL</Th>
                                    <Th>Description</Th>
                                    <Th>Date d'ajout</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {competitor.dataSources.map((source: DataSource) => (
                                    <Tr key={source.id}>
                                        <Td>{source.type}</Td>
                                        <Td>
                                            <a href={source.url} target="_blank" rel="noopener noreferrer">
                                                {source.url}
                                            </a>
                                        </Td>
                                        <Td>{source.description}</Td>
                                        <Td>{new Date(source.addedDate).toLocaleDateString()}</Td>
                                        <Td>
                                            <Button colorScheme="red" onClick={() => handleDeleteDataSource(competitor.id, source.id)}>
                                                Supprimer
                                            </Button>
                                            <Button colorScheme="blue" onClick={() => loadToEditDataSource(competitor.id, source.id)}>
                                                Modifier
                                            </Button>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    )}
                </Box>
            ))}
        </Box>
    );

};

export default GestionConcurrents; 