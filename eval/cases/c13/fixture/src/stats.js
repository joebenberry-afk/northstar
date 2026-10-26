'use strict';
const { round2 } = require('./util');

function mean(list) {
  return round2(list.reduce((a, b) => a + b, 0) / list.length);
}

module.exports = { mean };
