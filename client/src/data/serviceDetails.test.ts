import assert from 'node:assert/strict';
import test from 'node:test';
import { serviceDetails } from './serviceDetails.ts';
import { services } from './services.ts';

test('every catalogue service has a complete service-detail page definition', () => {
  assert.equal(serviceDetails.length, services.length);
  assert.deepEqual(
    serviceDetails.map((detail) => detail.path).sort(),
    services.map((service) => service.path).sort()
  );

  assert.ok(serviceDetails.every((detail) => detail.deliverables.length === 6));
  assert.ok(serviceDetails.every((detail) => detail.process.length === 4));
  assert.ok(serviceDetails.every((detail) => detail.benefits.length === 4));
});

test('related service links are valid and never point to the current service', () => {
  const validPaths = new Set(services.map((service) => service.path));

  for (const detail of serviceDetails) {
    assert.equal(detail.relatedPaths.length, 3);
    assert.ok(detail.relatedPaths.every((path) => validPaths.has(path)));
    assert.ok(detail.relatedPaths.every((path) => path !== detail.path));
  }
});

test('app development retains its dedicated technology section', () => {
  const appDevelopment = serviceDetails.find((detail) => detail.path === '/services/app-development');

  assert.ok(appDevelopment);
  assert.ok(appDevelopment.technologies);
  assert.ok(appDevelopment.technologies.length >= 12);
});
