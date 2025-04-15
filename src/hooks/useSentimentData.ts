import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../services/api";

export const useSentimentData = (competitorId?: string) => {
    return useQuery({
        queryKey: ['sentiment', competitorId],
        queryFn: () => apiFetch(`/api/veille/sentiment/${competitorId || ''}`)
            .then(res => res.data),
    });
};