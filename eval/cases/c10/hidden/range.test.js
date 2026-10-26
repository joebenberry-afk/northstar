const test = require('node:test');
const assert = require('node:assert');
const { range } = require('../src/range');
test('inclusive', () => assert.deepEqual(range(1, 3), [1, 2, 3]));
test('single', () => assert.deepEqual(range(5, 5), [5]));
