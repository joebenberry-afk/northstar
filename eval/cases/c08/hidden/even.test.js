const test = require('node:test');
const assert = require('node:assert');
const { isEven, isOdd } = require('../src/num');
test('even', () => { assert.equal(isEven(2), true); assert.equal(isEven(0), true); assert.equal(isEven(-4), true); assert.equal(isEven(3), false); });
test('odd kept', () => assert.equal(isOdd(3), true));
