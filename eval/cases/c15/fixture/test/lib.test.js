const test = require('node:test');
const assert = require('node:assert');
const lib = require('../src/lib');
test('loads', () => assert.equal(typeof lib, 'object'));
