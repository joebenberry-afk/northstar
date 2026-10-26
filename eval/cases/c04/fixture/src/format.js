'use strict';
const { splitCents, pad2 } = require('./money');

function formatPrice(cents) {
  const { whole, frac } = splitCents(cents);
  return `$${whole}.${pad2(frac)}`;
}

module.exports = { formatPrice };
