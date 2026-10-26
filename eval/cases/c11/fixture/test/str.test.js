const test = require('node:test');
const assert = require('node:assert');
const { reverse } = require('../src/str');
test('reverse', () => assert.equal(reverse('abc'), 'cba'));
