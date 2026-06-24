import assert from 'node:assert/strict';
import test from 'node:test';
import { mergeCmsServices, services } from './services.ts';

test('services navigation exposes the complete unique service catalogue', () => {
  assert.equal(services.length, 7);
  assert.equal(new Set(services.map((service) => service.path)).size, services.length);
  assert.ok(services.every((service) => service.path.startsWith('/services/')));
});

test('each service has useful structured content for cards and menus', () => {
  assert.ok(services.every((service) => service.description.length > 40));
  assert.ok(services.every((service) => service.capabilities.length >= 3));
  assert.ok(services.every((service) => !service.title.includes('\uFFFD')));
});

test('published CMS services control the visible catalogue and preserve local presentation data', () => {
  const merged = mergeCmsServices([
    {
      id: 'service-app-development',
      slug: 'app-development',
      title: 'Custom App Development',
      description: 'A CMS-managed description.',
      status: 'published'
    },
    {
      id: 'service-graphic-design',
      slug: 'graphic-design',
      title: 'Hidden Graphic Design',
      status: 'archived'
    }
  ]);
  const app = merged.find((service) => service.path === '/services/app-development');

  assert.equal(merged.length, 1);
  assert.equal(app?.title, 'Custom App Development');
  assert.equal(app?.description, 'A CMS-managed description.');
  assert.deepEqual(app?.capabilities, services[1].capabilities);
  assert.equal(app?.tagline, services[1].tagline);
});

test('new CMS services receive complete public card data and a working detail path', () => {
  const merged = mergeCmsServices([
    {
      id: 'service-brand-strategy',
      slug: 'brand-strategy',
      title: 'Brand Strategy',
      subtitle: 'Clarity before creativity',
      tagline: 'Build the right foundation.',
      description: 'A focused service that defines positioning, audience, messaging, and the practical direction for a growing brand.',
      capabilities: ['Positioning', 'Messaging', 'Brand roadmap'],
      featured: true,
      status: 'published'
    }
  ]);

  assert.equal(merged.length, 1);
  assert.equal(merged[0]?.path, '/services/brand-strategy');
  assert.equal(merged[0]?.number, '01');
  assert.equal(merged[0]?.featured, true);
  assert.equal(typeof merged[0]?.Icon, 'function');
});

test('an empty successful CMS catalogue does not restore archived local services', () => {
  assert.deepEqual(mergeCmsServices([]), []);
});
