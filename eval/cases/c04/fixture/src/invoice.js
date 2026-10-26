'use strict';
const { splitCents, pad2 } = require('./money');

// Last line of a printed invoice.
function balanceLine(cents) {
  const { whole, frac } = splitCents(cents);
  return `Balance: ${whole}.${pad2(frac)}`;
}

module.exports = { balanceLine };
