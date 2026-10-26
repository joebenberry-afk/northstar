'use strict';
const { withDefaults } = require('./options');

function createCart(opts) {
  const options = withDefaults(opts);
  const items = [];
  return {
    currency: options.currency,
    add(name, cents) { items.push({ name, cents }); },
    total() {
      const sub = items.reduce((s, i) => s + i.cents, 0);
      return Math.round(sub * (1 + options.taxRate));
    },
  };
}

module.exports = { createCart };
