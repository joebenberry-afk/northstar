const test = require('node:test');
const assert = require('node:assert');
const { roundPrice } = require('../src/round');

test('whole', () => assert.equal(roundPrice(2), '2.00'));
test('half up', () => assert.equal(roundPrice(1.005), '1.01'));
