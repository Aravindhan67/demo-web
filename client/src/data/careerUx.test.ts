import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const careersPage = await readFile(new URL('../pages/Careers.tsx', import.meta.url), 'utf8');
const openingPage = await readFile(new URL('../pages/CareerOpening.tsx', import.meta.url), 'utf8');
const form = await readFile(new URL('../components/CareerApplicationForm.tsx', import.meta.url), 'utf8');
const css = await readFile(new URL('../index.css', import.meta.url), 'utf8');

test('careers page prioritizes opportunities and derives its availability message', () => {
  assert.ok(careersPage.indexOf('<OpeningsSection') < careersPage.indexOf('id="culture"'));
  assert.match(careersPage, /CareerApplicationForm/);
  assert.match(careersPage, /id="apply"/);
  assert.match(careersPage, /career-apply-section/);
  assert.match(careersPage, /href="#apply"/);
  assert.match(careersPage, /statusLabel/);
  assert.doesNotMatch(careersPage, /Â/);
});

test('career detail avoids a false not-found state while CMS data loads', () => {
  assert.match(openingPage, /useCmsCollectionState/);
  assert.match(openingPage, /if \(loading\)/);
  assert.doesNotMatch(openingPage, /View application status/);
});

test('application form communicates requirements, privacy, and accessible feedback', () => {
  assert.match(form, /Fields marked/);
  assert.match(form, /autoComplete="name"/);
  assert.match(form, /autoComplete="email"/);
  assert.match(form, /aria-live="polite"/);
  assert.match(form, /\/privacy/);
  assert.match(form, /Selected:/);
});

test('career anchors and application form account for sticky navigation and mobile use', () => {
  assert.match(css, /#openings,[\s\S]*#apply[\s\S]*scroll-margin-top:/);
  assert.match(css, /\.career-form-actions/);
});
