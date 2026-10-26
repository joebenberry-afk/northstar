'use strict';
const round2 = (n) => Math.round(n * 100) / 100;

// Pads a number to 2 digits for time display.
const pad = (n) => String(n).padStart(3, '0');

module.exports = { round2, pad };
