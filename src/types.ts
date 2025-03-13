export interface SubscriptionPlan {
    id: string;
    name: 'ESSENTIEL' | 'PRO' | 'EXPERT';
    price: number;
    features: string[];
    recommended?: boolean;
}

export interface UserData {
    name: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword?: string;
    dateOfBirth?: string;
    profession?: string;
    skills?: string[];
    typeAbonnement?: string[];
}

export interface CompetitorAnalysis {
    seo: any;
    social: any;
}
export interface SEOAnalysis {
    traffic: any;
    engagement: any;
    growth: any;
    avgRanking: number;
    top10Keywords: number;
    estimatedTraffic: number;
}
export interface SocialMediaStats {
    sentiment: any;
    engagement: any;
    mentions: any;
}

export interface Competitor {
    id: string;
    name: string;
    domain: string;
    industry: string;
    keywords: string[];
}
export interface Alert {
    id: string;
    message: string;
    severity: string;
}
export interface CompetitorAnalysisModalProps {
    competitor: any;
}
export interface Analysis {
    seo: SEOAnalysis;
    social: SocialMediaStats;
}