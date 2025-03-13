import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useSentimentData = (competitorId?: string) => {
    return useQuery({
        queryKey: ['sentiment', competitorId],
        queryFn: () => axios.get(`/api/veille/sentiment/${competitorId || ''}`)
            .then(res => res.data),
    });
};