'use strict';
// Tax in whole cents, rounded half up. Rates have at most 4 decimals (basis points),
// so the math stays in integers and float error can't flip a half.
function calculateTax(cents, rate) {
  const bp = Math.round(rate * 10000);
  return Math.floor((cents * bp + 5000) / 10000);
}

module.exports = { calculateTax };
