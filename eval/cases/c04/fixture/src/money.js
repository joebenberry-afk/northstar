'use strict';
// Splits an integer amount of cents into whole units and remaining cents.
function splitCents(cents) {
  return { whole: Math.floor(cents / 100), frac: cents % 100 };
}

const pad2 = (n) => String(n).padStart(2, '0');

module.exports = { splitCents, pad2 };
