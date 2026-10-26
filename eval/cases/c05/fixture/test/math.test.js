const test = require('node:test');
const assert = require('node:assert');
const { clamp } = require('../src/math');

test('inside', () => assert.equal(clamp(5, 0, 10), 5));
test('below', () => assert.equal(clamp(-1, 0, 10), 0));
test('above', () => assert.equal(clamp(11, 0, 10), 10));
