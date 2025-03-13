import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCompetitors = () => {
    return useQuery({
        queryKey: ['competitors'],
        queryFn: () => axios.get('/api/veille/competitors').then(res => res.data),
        staleTime: 5 * 60 * 1000 // 5 minutes
    });
};