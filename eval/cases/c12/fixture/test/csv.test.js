const test = require('node:test');
const assert = require('node:assert');
const { splitLine } = require('../src/csv');
test('split', () => assert.deepEqual(splitLine('a,b'), ['a', 'b']));
