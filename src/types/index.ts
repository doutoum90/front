import { DataSourceType } from './competitor';
import { IconType } from 'react-icons';
import { ReactNode } from 'react';

export interface MarketData {
    date: string;
    value: number;
}

export interface MarketShare {
    company: string;
    value: number;
}

export interface CompetitorDataSource {
    id: string;
    type: DataSourceType;
    url: string;
    description?: string;
    addedDate: string;
}

export interface CompetitorKPI {
    id: string;
    name: string;
    value: number | string;
    date: string;
    source?: string;
}

export interface Competitor {
    id: string;
    name: string;
    description?: string;
    dataSources: CompetitorDataSource[];
    kpis: CompetitorKPI[];
}

export type { DataSourceType as DataSourceTypeEnum };

export * from './competitor';

export interface Section {
    title: string;
    icon: IconType;
    content: ReactNode;
} 