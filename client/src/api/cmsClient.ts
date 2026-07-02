import type { CmsCareerApplication, CmsLead, CmsLeadSubmission, CmsService } from './contracts.ts';

export interface CmsClientOptions {
  baseUrl?: string;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
}

const SITE_KEY = 'jac-medialand';

function configuredBaseUrl(): string {
  return import.meta.env?.VITE_CMS_API_URL || (import.meta.env?.DEV ? 'http://localhost:4000' : 'https://demo-server-hakt.onrender.com');
}

export function buildCmsUrl(path: string, baseUrl = configuredBaseUrl()): string {
  return `${baseUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}

export async function fetchCmsJson<T>(
  path: string,
  options: CmsClientOptions = {},
  init: RequestInit = {}
): Promise<T> {
  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), options.timeoutMs ?? 4_000);
  try {
    const response = await (options.fetchImpl ?? fetch)(buildCmsUrl(path, options.baseUrl), {
      cache: 'no-store',
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init.headers
      },
      signal: controller.signal
    });
    if (!response.ok) {
      throw new Error(`CMS request failed with ${response.status}`);
    }
    return response.json() as Promise<T>;
  } finally {
    globalThis.clearTimeout(timeout);
  }
}

export async function loadWithFallback<T>(
  loader: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await loader();
  } catch {
    return fallback;
  }
}

export function fetchCmsServices(options: CmsClientOptions = {}): Promise<CmsService[]> {
  return fetchCmsJson(`/v1/public/sites/${SITE_KEY}/services`, options);
}

export function fetchCmsCollection<T>(
  collectionKey: string,
  options: CmsClientOptions = {}
): Promise<T[]> {
  return fetchCmsJson(`/v1/public/sites/${SITE_KEY}/collections/${collectionKey}`, options);
}

export function submitCmsLead(
  submission: CmsLeadSubmission,
  options: CmsClientOptions = {}
): Promise<CmsLead> {
  return fetchCmsJson(
    `/v1/public/sites/${SITE_KEY}/forms/contact/submissions`,
    options,
    {
      method: 'POST',
      body: JSON.stringify(submission)
    }
  );
}

export async function submitCareerApplication(
  application: FormData,
  options: CmsClientOptions = {}
): Promise<CmsCareerApplication> {
  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), options.timeoutMs ?? 15_000);
  try {
    const response = await (options.fetchImpl ?? fetch)(
      buildCmsUrl(`/v1/public/sites/${SITE_KEY}/careers/applications`, options.baseUrl),
      { method: 'POST', body: application, signal: controller.signal }
    );
    if (!response.ok) {
      const body = await response.json().catch(() => ({})) as { message?: string | string[] };
      const message = Array.isArray(body.message) ? body.message.join(', ') : body.message;
      throw new Error(message || `Application failed with ${response.status}`);
    }
    return response.json() as Promise<CmsCareerApplication>;
  } finally {
    globalThis.clearTimeout(timeout);
  }
}

export function fetchCmsSettings(
  options: CmsClientOptions = {}
): Promise<Record<string, Record<string, unknown>>> {
  return fetchCmsJson(`/v1/public/sites/${SITE_KEY}/settings`, options);
}

