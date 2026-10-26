'use strict';

function price(qty, unit) {
  let total = qty * unit;
  if (total < 1) total = 1; // minimum charge
  if (qty >= 10) total = total * 0.9;
  return Math.round(total * 20) / 20; // nearest 5 cents
}

module.exports = { price };
