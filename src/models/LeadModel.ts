
export interface Lead {
  id: string;
  // Business information
  businessName: string;
  industry: string;
  companySize: string;
  revenue: string;
  yearFounded: string;
  website: string;
  
  // Contact person information
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  linkedIn: string;
  
  // Address information
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  
  // Additional information
  companySummary: string;
  employeeCount: string;
  technologies: string[];
  lastUpdated: Date;
  
  // Internal tracking
  createdAt: Date;
  enrichedAt: Date;
  enrichmentSource: string;
  status: 'active' | 'archived' | 'pending';
  notes: string;
  tags: string[];
  
  // Security and compliance
  hasConsent: boolean;
  consentDate?: Date;
  isEmailVerified: boolean;
  privacyStatus: 'compliant' | 'needs-review' | 'non-compliant';
}

// This enum can be used to track lead sources
export enum LeadSource {
  MANUAL_ENTRY = 'manual_entry',
  CSV_IMPORT = 'csv_import',
  API = 'api',
  WEB_SCRAPING = 'web_scraping',
  EMAIL_SUBSCRIPTION = 'email_subscription',
  PARTNER_REFERRAL = 'partner_referral'
}

// Simpler type for initial lead capture before enrichment
export interface BasicLead {
  businessName: string;
  website?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}
