const test = require('node:test');
const assert = require('node:assert');
const { createCart } = require('../src/cart');
const { withDefaults } = require('../src/options');

test('options do not leak into later carts', () => { createCart({ currency: 'EUR', taxRate: 0.5 }); const c = createCart(); assert.equal(c.currency, 'USD'); c.add('a', 1000); assert.equal(c.total(), 1100); });
test('an earlier cart keeps its options', () => { const a = createCart({ taxRate: 0.2 }); createCart({ taxRate: 0.5 }); a.add('x', 1000); assert.equal(a.total(), 1200); });
test('shared helper does not mutate defaults', () => { withDefaults({ currency: 'GBP' }); assert.equal(withDefaults().currency, 'USD'); });
