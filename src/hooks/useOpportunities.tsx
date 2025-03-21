import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useQueries } from '@tanstack/react-query';
import { opportunitiesService } from '../services/opportunitiesService';
import { Opportunity, RegulationShort } from '../types';

const OPPORTUNITES_MOCK: Opportunity[] = [
    {
        id: 'zehzejhe',
        message: 'Accord commercial avec l\'asie	',
        date: '2024-03-25',
        source: 'Système',
        status: 'new'
    },
    {
        id: 'zehzejheerriuere',
        message: 'Nouvelle aide pour les PME',
        date: '2024-03-24',
        source: 'Sécurité',
        status: 'in_progress'
    },
    {
        id: 'zehzejheriuere',
        message: 'Augmentations des investissements étrangers',
        date: '2024-03-23',
        source: 'Infrastructure',
        status: 'resolved'
    },
];

const REGULATIONS_MOCK: RegulationShort[] = [
    {
        id: 'zezeezhzejheriuere',
        message: 'Nouveau décret sur la réglementation du e-commerce',
        date: '2025-03-15'
    },
    {
        id: 'reireuizezeezhzejheriuere',
        message: 'Subvention disponible pour les start-ups technologiques',
    },
    {
        id: 'reireuizezeezhzejerheriuere',
        message: 'loi sur la protection des données renforcée'
    }
]

export const useOpportunities = () => {
    const toast = useToast();
    const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
    const [regulations, setRegulations] = useState<RegulationShort[]>([]);

    const [opportunitiesQuery, regulationsQuery] = useQueries({
        queries: [
            {
                queryKey: ['opportunities'],
                queryFn: opportunitiesService.getOpportunities,
                gcTime: 5 * 60 * 1000,
            },
            {
                queryKey: ['regulations'],
                queryFn: opportunitiesService.getRegulations,
                gcTime: 5 * 60 * 1000,
            },
        ],
    });

    useEffect(() => {
        if (opportunitiesQuery.data) {
            setOpportunities(opportunitiesQuery.data.length > 0 ? opportunitiesQuery.data : OPPORTUNITES_MOCK);
        }
        if (regulationsQuery.data) {
            setRegulations(regulationsQuery.data.length > 0 ? regulationsQuery.data : REGULATIONS_MOCK);
        }
    }, [opportunitiesQuery.data, regulationsQuery.data]);

    const handleDelete = async (id: string) => {
        try {
            await opportunitiesService.deleteOpportunity(id);
            toast({
                title: 'Succès',
                description: 'Opportunité supprimée',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
            opportunitiesQuery.refetch();
        } catch (error) {
            toast({
                title: 'Erreur',
                description: 'Échec de la suppression',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleResolve = (id: string) => {
        setOpportunities(prev =>
            prev.map(opp => (opp.id === id ? { ...opp, status: 'resolved' } : opp))
        );
    };

    const loading = opportunitiesQuery.isLoading || regulationsQuery.isLoading;
    const error = opportunitiesQuery.error || regulationsQuery.error;

    return {
        opportunities,
        regulations,
        handleDelete,
        handleResolve,
        loading,
        error: error ? 'Erreur lors du chargement des données' : null,
    };
};