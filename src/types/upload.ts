
export type UploadResults = any[];

export interface CompanyData {
  company_name: string;
  website?: string;
  industry?: string;
  size?: string;
  location?: string;
}

export interface EnrichmentData {
  description: string;
  productsServices: string[];
  industryChallenges: string[];
  recentNews: string;
  painPoints: string[];
}

export interface EnrichedCompany extends CompanyData {
  status: string;
  enrichment: EnrichmentData;
  email: string;
}
