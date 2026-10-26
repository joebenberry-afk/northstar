'use strict';
// Parses a port from config (JSON number) or env/CLI (string).
function parsePort(value) {
  if (typeof value === 'number') return checkRange(value);
  const n = Number.parseInt(value, 10);
  if (Number.isNaN(n)) throw new Error(`invalid port: ${value}`);
  return checkRange(n);
}

function checkRange(n) {
  if (n < 0 || n > 65535) throw new Error(`port out of range: ${n}`);
  return n;
}

module.exports = { parsePort };
