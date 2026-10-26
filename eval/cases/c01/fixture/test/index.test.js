const test = require('node:test');
const assert = require('node:assert');
const { add } = require('../src/index');
test('add', () => assert.equal(add('x'), 1));
