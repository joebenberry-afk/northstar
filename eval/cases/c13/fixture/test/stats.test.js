const test = require('node:test');
const assert = require('node:assert');
const { mean } = require('../src/stats');
test('mean', () => assert.equal(mean([1, 2, 4]), 2.33));
