'use strict';
// Splits a simple CSV line (no quoting support yet).
function splitLine(line) {
  return line.split(',');
}

module.exports = { splitLine };
