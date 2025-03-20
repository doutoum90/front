import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import * as regulationService from '../services/regulationService';
import { Regulation, Report } from '../types';
import { useDebounce } from './useDebounce';

export const useRegulations = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const {
    data: regulations = [],
    isLoading: regulationsLoading,
    isError: regulationsError,
    error: regulationsFetchError,
  } = useQuery<Regulation[], Error>({
    queryKey: ['regulations'],
    queryFn: regulationService.fetchRegulations,
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: reports = [],
    isLoading: reportsLoading,
    isError: reportsError,
    error: reportsFetchError,
  } = useQuery<Report[], Error>({
    queryKey: ['reports'],
    queryFn: regulationService.fetchReports,
    staleTime: 5 * 60 * 1000,
  });

  const [report, setReport] = useState<Report>({
    name: '',
    description: '',
    date: new Date().toISOString(),
    status: 'new',
    type: '',
    url: '',
    image: '',
    pdf: '',
  });
  const debouncedReport = useDebounce(report, 300);

  const createReportMutation = useMutation({
    mutationFn: (reportData: Partial<Report>) => regulationService.createPersonalizedReport(reportData),
    onSuccess: (newReport) => {
      queryClient.setQueryData(['reports'], (old: Report[] | undefined) => (old ? [...old, newReport] : [newReport]));
      toast({ title: 'Rapport créé', status: 'success' });
      setReport({
        name: '',
        description: '',
        date: new Date().toISOString(),
        status: 'new',
        type: '',
        url: '',
        image: '',
        pdf: '',
      });
    },
    onError: () =>
      toast({
        title: 'Erreur',
        description: 'Erreur lors de la création du rapport',
        status: 'error',
      }),
  });

  const downloadReportMutation = useMutation({
    mutationFn: (reportId: string) => regulationService.downloadReport(reportId),
    onSuccess: (_, reportId) => toast({ title: `Téléchargement du rapport ${reportId}`, status: 'success' }),
    onError: () =>
      toast({
        title: 'Erreur',
        description: 'Erreur lors du téléchargement du rapport',
        status: 'error',
      }),
  });

  useEffect(() => {
    if (regulationsError && regulationsFetchError) {
      toast({
        title: 'Erreur',
        description: regulationsFetchError.message || 'Erreur lors de la récupération des réglementations',
        status: 'error',
      });
    }
    if (reportsError && reportsFetchError) {
      toast({
        title: 'Erreur',
        description: reportsFetchError.message || 'Erreur lors de la récupération des rapports',
        status: 'error',
      });
    }
  }, [regulationsError, reportsError, regulationsFetchError, reportsFetchError, toast]);

  return {
    regulations,
    reports,
    report: debouncedReport,
    setReport,
    createPersonalizedReport: createReportMutation.mutate,
    downloadReport: downloadReportMutation.mutate,
    loading: regulationsLoading || reportsLoading || createReportMutation.isPending || downloadReportMutation.isPending,
    error: regulationsFetchError || reportsFetchError,
  };
};