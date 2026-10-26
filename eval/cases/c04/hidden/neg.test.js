const test = require('node:test');
const assert = require('node:assert');
const { formatPrice } = require('../src/format');
const { balanceLine } = require('../src/invoice');

test('negative price', () => assert.equal(formatPrice(-150), '-$1.50'));
test('negative cents', () => assert.equal(formatPrice(-5), '-$0.05'));
test('positive unchanged', () => assert.equal(formatPrice(150), '$1.50'));
test('second caller: negative balance', () => assert.equal(balanceLine(-2599), 'Balance: -25.99'));
test('second caller: positive balance', () => assert.equal(balanceLine(2599), 'Balance: 25.99'));
