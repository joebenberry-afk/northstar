const test = require('node:test');
const assert = require('node:assert');
const { median, mean } = require('../src/stats');
test('odd', () => assert.equal(median([3, 1, 2]), 2));
test('even', () => assert.equal(median([1, 2, 3, 4]), 2.5));
test('rounded', () => assert.equal(median([1, 1.333]), 1.17));
test('no mutation', () => { const l = [3, 1, 2]; median(l); assert.deepEqual(l, [3, 1, 2]); });
test('mean kept', () => assert.equal(mean([1, 2, 4]), 2.33));
