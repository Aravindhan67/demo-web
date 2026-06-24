import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const portfolioSource = await readFile(new URL('../pages/Portfolio.tsx', import.meta.url), 'utf8');

test('portfolio keeps every category with future categories at zero', () => {
  assert.match(portfolioSource, /label: 'All work', count: 4/);
  assert.match(portfolioSource, /label: 'Development', count: 4/);
  assert.match(portfolioSource, /label: 'UX \/ UI', count: 0/);
  assert.match(portfolioSource, /label: 'Logo Design', count: 0/);
  assert.match(portfolioSource, /label: 'Packaging', count: 0/);
});

test('portfolio provides a clear empty state for categories without projects', () => {
  assert.match(portfolioSource, /Projects will be added soon/);
});
