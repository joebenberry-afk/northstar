const test = require('node:test');
const assert = require('node:assert');
const { invoiceTotal } = require('../src/invoice');
const { calculateTax } = require('../src/tax');

test('total', () => assert.equal(invoiceTotal([{ price: '10.00', qty: 1 }], 0.1), 1100));
test('tax', () => assert.equal(calculateTax(1000, 0.1), 100));
