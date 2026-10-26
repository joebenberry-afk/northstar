'use strict';
function clamp(n, lo, hi) {
  return Math.min(lo, Math.max(hi, n));
}

module.exports = { clamp };
