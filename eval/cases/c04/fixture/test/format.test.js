const test = require('node:test');
const assert = require('node:assert');
const { formatPrice } = require('../src/format');
const { balanceLine } = require('../src/invoice');

test('price', () => assert.equal(formatPrice(150), '$1.50'));
test('cents only', () => assert.equal(formatPrice(5), '$0.05'));
test('balance', () => assert.equal(balanceLine(2599), 'Balance: 25.99'));
