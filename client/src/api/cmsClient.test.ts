import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildCmsUrl,
  fetchCmsCollection,
  fetchCmsJson,
  loadWithFallback,
  submitCareerApplication,
  submitCmsLead
} from './cmsClient.ts';

test('buildCmsUrl creates a versioned public API URL', () => {
  assert.equal(
    buildCmsUrl('/v1/public/sites/jac-medialand/services', 'http://localhost:4000/'),
    'http://localhost:4000/v1/public/sites/jac-medialand/services'
  );
});

test('fetchCmsJson parses successful JSON responses', async () => {
  const result = await fetchCmsJson<{ ok: boolean }>('/health/live', {
    baseUrl: 'http://cms.test',
    fetchImpl: async () => new Response(JSON.stringify({ ok: true }), { status: 200 })
  });
  assert.deepEqual(result, { ok: true });
});

test('loadWithFallback returns local content when the CMS is unavailable', async () => {
  const fallback = [{ slug: 'local' }];
  const result = await loadWithFallback(async () => {
    throw new Error('offline');
  }, fallback);
  assert.deepEqual(result, fallback);
});

test('submitCmsLead posts the expected public form contract', async () => {
  let request: { url?: string; body?: string } = {};
  await submitCmsLead({
    contact: { name: 'Priya', email: 'priya@example.com' },
    fields: { subject: 'Website', message: 'Please contact me.' }
  }, {
    baseUrl: 'http://cms.test',
    fetchImpl: async (url, init) => {
      request = { url: String(url), body: String(init?.body) };
      return new Response(JSON.stringify({ id: 'lead-1', status: 'new' }), { status: 201 });
    }
  });

  assert.equal(request.url, 'http://cms.test/v1/public/sites/jac-medialand/forms/contact/submissions');
  assert.equal(JSON.parse(request.body ?? '').fields.subject, 'Website');
});

test('fetchCmsCollection requests a published structured collection', async () => {
  let requestedUrl = '';
  const result = await fetchCmsCollection<{ slug: string }>('teamMembers', {
    baseUrl: 'http://cms.test',
    fetchImpl: async (url) => {
      requestedUrl = String(url);
      return new Response(JSON.stringify([{ slug: 'founder' }]), { status: 200 });
    }
  });

  assert.equal(requestedUrl, 'http://cms.test/v1/public/sites/jac-medialand/collections/teamMembers');
  assert.equal(result[0].slug, 'founder');
});

test('submitCareerApplication posts multipart data without overriding its content type', async () => {
  const form = new FormData();
  form.set('name', 'Priya');
  form.set('resume', new Blob(['resume'], { type: 'application/pdf' }), 'priya.pdf');
  let request: { url?: string; body?: unknown; headers?: HeadersInit } = {};

  await submitCareerApplication(form, {
    baseUrl: 'http://cms.test',
    fetchImpl: async (url, init) => {
      request = { url: String(url), body: init?.body, headers: init?.headers };
      return new Response(JSON.stringify({ id: 'application-1', status: 'new' }), { status: 201 });
    }
  });

  assert.equal(request.url, 'http://cms.test/v1/public/sites/jac-medialand/careers/applications');
  assert.equal(request.body, form);
  assert.equal(request.headers, undefined);
});
