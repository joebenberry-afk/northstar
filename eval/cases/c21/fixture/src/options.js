'use strict';
const DEFAULTS = { currency: 'USD', taxRate: 0.1 };

// Fill in any option the caller left out.
function withDefaults(opts = {}) {
  return Object.assign(DEFAULTS, opts);
}

module.exports = { withDefaults, DEFAULTS };
