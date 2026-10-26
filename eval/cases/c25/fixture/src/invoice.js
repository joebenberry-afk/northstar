'use strict';
const { calculateTax } = require('./tax');

// Line prices arrive from the order API as decimal strings, e.g. "19.99".
function invoiceTotal(lines, rate) {
  const subtotal = lines.reduce((s, l) => s + Math.floor(parseFloat(l.price) * 100) * l.qty, 0);
  return subtotal + calculateTax(subtotal, rate);
}

module.exports = { invoiceTotal };
