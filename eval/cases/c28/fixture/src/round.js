'use strict';
// Round a price in dollars to cents for display, half up.
function roundPrice(x) {
  return (Math.round(x * 100) / 100).toFixed(2);
}

module.exports = { roundPrice };
