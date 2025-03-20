import { useState, useEffect, useCallback } from 'react';
import { Competitor } from '../types';
import { competitorsService } from '../services/competitorsService';

export const useCompetitors = () => {
    const [competitors, setCompetitors] = useState<Competitor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCompetitors = useCallback(async () => {
        try {
            setLoading(true);
            const data = await competitorsService.getCompetitors();
            setCompetitors(data);
            setError(null);
        } catch (err) {
            setError('Erreur lors du chargement des concurrents');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const addCompetitor = useCallback(async (competitor: Partial<Competitor>) => {
        try {
            await competitorsService.addCompetitor(competitor);
            await fetchCompetitors(); // Re-fetch après ajout
        } catch (err) {
            console.error('Erreur lors de l\'ajout du concurrent:', err);
            throw err;
        }
    }, [fetchCompetitors]);

    const deleteCompetitor = useCallback(async (id: string) => {
        try {
            await competitorsService.deleteCompetitor(id);
            await fetchCompetitors(); // Re-fetch après suppression
        } catch (err) {
            console.error('Erreur lors de la suppression du concurrent:', err);
            throw err;
        }
    }, [fetchCompetitors]);

    useEffect(() => {
        fetchCompetitors();
    }, [fetchCompetitors]);

    return {
        competitors,
        loading,
        error,
        addCompetitor,
        deleteCompetitor,
        refresh: fetchCompetitors
    };
};