import test from 'node:test';
import assert from 'node:assert/strict';
import { isProjectFilter, matchesProject, projectCountLabel } from '../dist/assets/filters.js';

test('filters use complete category tokens and preserve all-projects fallback', () => {
  assert.equal(matchesProject('media web', 'media'), true);
  assert.equal(matchesProject('media web', 'data'), false);
  assert.equal(matchesProject('metadata', 'data'), false);
  assert.equal(matchesProject('  media\tweb  ', 'web'), true);
  assert.equal(matchesProject('', 'all'), true);
  assert.equal(matchesProject('', 'web'), false);
});

test('only supported filter values are accepted', () => {
  assert.equal(isProjectFilter('geospatial'), true);
  for (const input of [undefined, '', 'unknown', 'ALL']) assert.equal(isProjectFilter(input), false);
});

test('screen-reader result counts include singular and subset wording', () => {
  assert.equal(projectCountLabel(6, 6), '6 projects');
  assert.equal(projectCountLabel(1, 6), '1 project of 6');
  assert.equal(projectCountLabel(0, 6), '0 projects of 6');
});
