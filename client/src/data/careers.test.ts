import assert from 'node:assert/strict';
import test from 'node:test';
import { careerOpeningPath, isCareerOpeningAcceptingApplications, isGeneralCareerOpening } from './careers.ts';

const opening = {
  slug: 'frontend-developer',
  title: 'Frontend Developer',
  status: 'published' as const,
  location: 'Erode / Flexible',
  employmentType: 'Full-time',
  workplaceType: 'Hybrid',
  department: 'Engineering',
  description: 'Build thoughtful digital products.',
  responsibilities: ['Build interfaces'],
  requirements: ['React experience'],
  benefits: ['Flexible hours'],
  acceptingApplications: true
};

test('career openings receive stable public detail paths', () => {
  assert.equal(careerOpeningPath(opening), '/careers/frontend-developer');
});

test('closed and expired openings cannot accept applications', () => {
  assert.equal(isCareerOpeningAcceptingApplications(opening, new Date('2026-06-10')), true);
  assert.equal(isCareerOpeningAcceptingApplications({ ...opening, acceptingApplications: false }, new Date('2026-06-10')), false);
  assert.equal(isCareerOpeningAcceptingApplications({ ...opening, closingDate: '2026-06-09' }, new Date('2026-06-10')), false);
});

test('the talent-network record remains a general application when its CMS flag is missing', () => {
  assert.equal(isGeneralCareerOpening({ ...opening, slug: 'talent-network', generalApplication: false }), true);
  assert.equal(isGeneralCareerOpening(opening), false);
});
