const test = require('node:test');
const assert = require('node:assert');
const { isOdd } = require('../src/num');
test('odd', () => { assert.equal(isOdd(3), true); assert.equal(isOdd(-3), true); assert.equal(isOdd(2), false); });
