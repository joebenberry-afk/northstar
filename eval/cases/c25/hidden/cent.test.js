const test = require('node:test');
const assert = require('node:assert');
const { invoiceTotal } = require('../src/invoice');
const { calculateTax } = require('../src/tax');

test('19.99 is 1999 cents', () => assert.equal(invoiceTotal([{ price: '19.99', qty: 1 }], 0), 1999));
test('4.35 x 2 with tax', () => assert.equal(invoiceTotal([{ price: '4.35', qty: 2 }], 0.1), 957));
test('tax unchanged', () => { assert.equal(calculateTax(1000, 0.1), 100); assert.equal(calculateTax(1005, 0.1), 101); });
