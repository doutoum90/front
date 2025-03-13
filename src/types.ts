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