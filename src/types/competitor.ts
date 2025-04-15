export enum DataSourceType {
    website = 'website',
    social_media = 'social_media',
    news = 'news',
    blog = 'blog',
    rss = 'rss',
    api = 'api',
    scraping = 'scraping'
}

export enum DataCollectionMethod {
    scraping = 'scraping',
    api = 'api',
    rss = 'rss',
    manual = 'manual'
}

export enum APIType {
    google_news = 'google_news',
    twitter = 'twitter',
    linkedin = 'linkedin',
    google_trends = 'google_trends',
    semrush = 'semrush',
    ahrefs = 'ahrefs',
    data_for_seo = 'data_for_seo',
    open_corporates = 'open_corporates',
    builtwith = 'builtwith',
    feedly = 'feedly'
}

export interface DataSource {
    id: string;
    type: DataSourceType;
    url: string;
    description?: string;
    collectionMethod: DataCollectionMethod;
    apiType?: APIType;
    scrapingConfig?: {
        selector: string;
        frequency: string;
        lastScrapedAt?: Date;
    };
    apiConfig?: {
        apiKey?: string;
        endpoint: string;
        frequency: string;
        lastFetchedAt?: Date;
    };
    rssConfig?: {
        feedUrl: string;
        frequency: string;
        lastFetchedAt?: Date;
    };
    addedDate: Date;
    updatedDate: Date;
}

export interface CompetitorKPI {
    id: string;
    name: string;
    value: number | string;
    date: string;
    source?: string;
    category: 'price' | 'innovation' | 'social_presence' | 'seo' | 'market_share' | 'other';
    trend?: {
        direction: 'up' | 'down' | 'stable';
        percentage: number;
    };
    alert?: {
        threshold: number;
        condition: 'above' | 'below' | 'equals';
        enabled: boolean;
    };
}

export interface Competitor {
    id: string;
    name: string;
    description?: string;
    domain: string;
    industry?: string;
    keywords: string[];
    dataSources: DataSource[];
    kpis: CompetitorKPI[];
    monitoringConfig: {
        frequency: 'hourly' | 'daily' | 'weekly' | 'monthly';
        alertChannels: {
            email?: string[];
            slack?: string;
            webhook?: string;
        };
        enabledAlerts: {
            priceChanges: boolean;
            newProducts: boolean;
            socialMentions: boolean;
            newsArticles: boolean;
            seoChanges: boolean;
        };
    };
    addedDate: Date;
    updatedDate: Date;
} 