import { ReactNode } from "react";
import { IconType } from 'react-icons/lib';
export interface SubscriptionPlan {
    id: string;
    name: 'Essentiel' | 'PRO' | 'Expert'
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
    trialActive?: boolean;
    typeAbonnement?: 'Essentiel' | 'PRO' | 'Expert';
}

export interface SubscriptionStepsData {
    userData?: UserData;
    selectedPlan?: SubscriptionPlan;
    trialActive?: boolean;
}

export interface Competitor {
    id: string;
    name: string;
    domain: string;
    industry: string;
    keywords: string[];
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
    typeAbonnement: 'Essentiel' | 'PRO' | 'Expert';
    trialActive: boolean;
    avatar?: string;
};

export interface AuthContextType {
    user: User | null | undefined;
    isLoading: boolean;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => void;
    updateSubscription: (typeAbonnement: 'Essentiel' | 'PRO' | 'Expert') => Promise<void>;
    getTrialStatus: () => Promise<{ trialActive: boolean }>;
    register: (userData: UserData & { typeAbonnement: 'Essentiel' | 'PRO' | 'Expert' }) => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    refreshAccessToken: (refreshToken: string) => Promise<string>;
    refreshUser: () => Promise<void>;
};

export type AuthProviderProps = {
    children: ReactNode;
    onLoginSuccess: () => void;
    onLogout: () => void;
};


export type PrivateRouteProps = {
    children: ReactNode;
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
    onAdd: (competitor: Competitor) => void;
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
    trialActive: boolean;
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
    date: string | number;
    value: number;
}

export interface MarketShare {
    company: string;
    value: number;
}

export type FeatureAccess = {
    analytics: boolean;
    exportData: boolean;
    apiAccess: boolean;
    premiumSupport: boolean;
};

export interface Section {
    title: string;
    icon: IconType;
    content: React.ReactNode;
}

export interface AdminUser {
    id: string;
    email: string;
    role: string;
}

export interface AuthAdminContextType {
    adminUser: AdminUser | null;
    isLoading: boolean;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => void;
    refreshAccessToken: () => Promise<string>;
    refreshUser: () => Promise<void>;
}

export interface AuthAdminProviderProps {
    children: React.ReactNode;
    onLoginSuccess: () => void;
    onLogout: () => void;
} 