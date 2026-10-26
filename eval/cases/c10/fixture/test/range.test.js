const test = require('node:test');
const assert = require('node:assert');
const { range } = require('../src/range');
test('is a function', () => assert.equal(typeof range, 'function'));
