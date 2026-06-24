import assert from 'node:assert/strict';
import test from 'node:test';
import { buildGenericServiceDetail } from './cmsServiceDetail.ts';
import { mergeCmsServices } from './services.ts';

test('a CMS-only service gets a complete generic detail page model', () => {
  const [service] = mergeCmsServices([
    {
      id: 'service-brand-strategy',
      slug: 'brand-strategy',
      title: 'Brand Strategy',
      subtitle: 'Clarity before creativity',
      tagline: 'Build the right foundation.',
      description: 'A focused service that defines positioning, audience, messaging, and the practical direction for a growing brand.',
      capabilities: ['Positioning', 'Messaging', 'Brand roadmap'],
      status: 'published'
    }
  ]);

  const detail = buildGenericServiceDetail(service);

  assert.equal(detail.heroStatement, service.tagline);
  assert.equal(detail.deliverables.length, 3);
  assert.ok(detail.deliverables.every((item) => item.description.includes(service.title)));
  assert.equal(detail.ctaLabel, 'Discuss Brand Strategy');
});
