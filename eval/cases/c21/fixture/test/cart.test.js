const test = require('node:test');
const assert = require('node:assert');
const { createCart } = require('../src/cart');

test('euro cart', () => assert.equal(createCart({ currency: 'EUR' }).currency, 'EUR'));
test('custom tax', () => { const c = createCart({ taxRate: 0.2 }); c.add('a', 1000); assert.equal(c.total(), 1200); });
test('default currency', () => assert.equal(createCart().currency, 'USD'));
test('default tax', () => { const c = createCart(); c.add('a', 1000); assert.equal(c.total(), 1100); });
