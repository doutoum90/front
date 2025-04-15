import { DataSourceType } from './competitor';

export interface AddCompetitorDataSourceDto {
    addedDate?: any;
    type: DataSourceType;
    url: string;
    description?: string;
    id?: string;
}

export interface AddCompetitorDto {
    name: string;
    description?: string;
} 