const API_URL = import.meta.env.VITE_CMS_API_URL || 'http://localhost:4000';

const getHeaders = (isMultipart = false) => {
  const token = localStorage.getItem('admin_token');
  const headers: Record<string, string> = {};
  if (!isMultipart) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const apiFetch = async (path: string, options: RequestInit = {}) => {
  const url = `${API_URL}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getHeaders(options.body instanceof FormData),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `Request failed with status ${response.status}`);
  }

  // Handle file downloads/CSV
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('text/csv')) {
    return response.text();
  }

  return response.json();
};

export const api = {
  // Auth
  login: (credentials: Record<string, string>) => 
    apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  forgotPassword: (email: string) => 
    apiFetch('/api/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) }),
  resetPassword: (payload: Record<string, string>) => 
    apiFetch('/api/auth/reset-password', { method: 'POST', body: JSON.stringify(payload) }),
  changePassword: (payload: Record<string, string>) => 
    apiFetch('/api/auth/change-password', { method: 'POST', body: JSON.stringify(payload) }),
  getProfile: () => 
    apiFetch('/api/auth/profile'),

  // Stats
  getStats: () => 
    apiFetch('/api/admin/stats'),

  // CRUD for resource paths
  list: (resource: string) => 
    apiFetch(`/api/admin/${resource}`),
  create: (resource: string, data: Record<string, unknown>) => 
    apiFetch(`/api/admin/${resource}`, { method: 'POST', body: JSON.stringify(data) }),
  update: (resource: string, id: string, data: Record<string, unknown>) => 
    apiFetch(`/api/admin/${resource}/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (resource: string, id: string) => 
    apiFetch(`/api/admin/${resource}/${id}`, { method: 'DELETE' }),

  // File Upload
  upload: (formData: FormData) => 
    apiFetch('/api/admin/upload', { method: 'POST', body: formData }),

  // CSV Export Contacts
  exportContacts: async () => {
    const text = await apiFetch('/api/admin/contacts-export');
    const blob = new Blob([text], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'contact-enquiries.csv');
    a.click();
  },

  // Website Settings
  getSettings: () =>
    apiFetch('/api/admin/settings')
};
