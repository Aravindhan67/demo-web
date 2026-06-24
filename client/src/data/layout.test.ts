import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const css = await readFile(new URL('../index.css', import.meta.url), 'utf8');

test('CMS-managed text wraps instead of overflowing public cards', () => {
  assert.match(css, /\.team-name,[\s\S]*overflow-wrap:\s*anywhere/);
});

test('team cards stack on narrow phones despite older competing rules', () => {
  assert.match(css, /@media \(max-width: 520px\)[\s\S]*\.team-grid\s*\{[^}]*grid-template-columns:\s*1fr\s*!important/s);
});
