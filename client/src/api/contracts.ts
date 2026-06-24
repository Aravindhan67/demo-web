export interface CmsService {
  id: string;
  slug: string;
  title?: string;
  subtitle?: string;
  tagline?: string;
  description?: string;
  capabilities?: string[];
  featured?: boolean;
  status: 'draft' | 'published' | 'archived';
}

export interface CmsLeadSubmission {
  idempotencyKey?: string;
  contact: {
    name: string;
    email: string;
    phone?: string;
  };
  fields: Record<string, unknown>;
  source?: Record<string, unknown>;
  website?: string;
}

export interface CmsLead {
  id: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  createdAt?: string;
}

export interface CmsCareerApplication {
  id: string;
  status: 'new' | 'reviewing' | 'shortlisted' | 'interview' | 'hired' | 'rejected';
  createdAt?: string;
}
