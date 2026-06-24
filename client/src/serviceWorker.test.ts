import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');

test('the website registers a service worker for caching', () => {
  assert.match(html, /serviceWorker\.register/);
  assert.match(html, /sw\.js/);
});
