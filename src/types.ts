import { ReactNode } from "react";
import { IconType } from 'react-icons/lib';
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

export interface CompetitorAnalysisModalProps {
    competitor: any;
}

export interface Analysis {
    seo: SEOAnalysis;
    social: SocialMediaStats;
}

export interface Alert {
    id: number;
    message: string;
    status: 'new' | 'in_progress' | 'resolved';
    priority: string;
    date: string;
    source: string;
}

export interface Report {
    name: string;
    description: string;
    date: string;
    status: 'new' | 'in_progress' | 'resolved';
    type: string;
    url: string;
    image: string;
    pdf: string;
}

export interface Regulation {
    title: string;
    category: string;
    status: 'Active' | 'En révision' | 'Expirée';
    department: string;
    effectiveDate: string;
    lastUpdate: string;
}

export type User = {
    createdAt?: string;
    name?: string;
    lastname?: string;
    email: string;
    password?: string;
    dateOfBirth?: string;
    profession?: string;
    skills?: string[];
    typeAbonnement?: string[];
};




export type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    register: (userData: User) => Promise<void>;
    logout: () => void;
    resetPassword: (email: string) => Promise<void>;
    refreshAccessToken: () => Promise<string>;
};
export type AuthProviderProps = {
    children: ReactNode;
    onLoginSuccess: () => void;
    onLogout: () => void;
};


export type PrivateRouteProps = {
    children: any;
};


export interface FormData {
    name: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
    dateOfBirth: string;
    profession: string;
    skills?: string[];
    typeAbonnement?: string[];
}

export interface AddCompetitorFormProps {
    onAdd: (competitor: any) => void;
}

export interface Opportunity {
    id: string;
    message: string;
    date: string;
    source: string;
    status: 'new' | 'in_progress' | 'resolved';
}

export interface RegulationShort {
    id: string;
    message: string;
    date?: string;
}
export interface Block {
    id: string;
    message: string;
    date: string;
    icon: React.ReactNode;
}

export interface AccountCreationFormProps {
    onSuccess: (userData: UserData) => void;
    showPasswordPolicy?: boolean;
    ctaText?: string;
}


export interface ConfirmationProps {
    user: UserData;
    plan: SubscriptionPlan;
}

export interface PaymentFormProps {
    user: UserData;
    plan: SubscriptionPlan;
    onSuccess: () => void;
}

export interface PaymentPageProps {
    user: UserData;
    plan: SubscriptionPlan;
    onSuccess: () => void;
}

export interface StripePaymentWrapperProps {
    plan: SubscriptionPlan;
    user: UserData;
    onSuccess: () => void;
}

export interface AuthLayoutProps {
    children: ReactNode;
}

export interface PrivateLayoutProps {
    children: ReactNode;
}

export interface PublicLayoutProps {
    children: ReactNode;
}



export interface MarketData {
    x: string;
    y: number;
}

export interface MarketShare {
    company: string;
    value: number;
}

// src/types/subscription.ts
export enum SubscriptionPlanEnum {
    ESSENTIEL = 'ESSENTIEL',
    PRO = 'PRO',
    EXPERT = 'EXPERT'
}

export type FeatureAccess = {
    analytics: boolean;
    exportData: boolean;
    apiAccess: boolean;
    premiumSupport: boolean;
};

export const PLAN_FEATURES: Record<SubscriptionPlanEnum, FeatureAccess> = {
    [SubscriptionPlanEnum.ESSENTIEL]: {
        analytics: true,
        exportData: false,
        apiAccess: false,
        premiumSupport: false
    },
    [SubscriptionPlanEnum.PRO]: {
        analytics: true,
        exportData: true,
        apiAccess: true,
        premiumSupport: false
    },
    [SubscriptionPlanEnum.EXPERT]: {
        analytics: true,
        exportData: true,
        apiAccess: true,
        premiumSupport: true
    }
};


export interface Section {
    title: string;
    icon: IconType;
    content: React.ReactNode;
}