const test = require('node:test');
const assert = require('node:assert');
const { capitalize } = require('../src/strings');

test('capitalize', () => assert.equal(capitalize('abc'), 'Abc'));
