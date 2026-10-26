'use strict';
// Inclusive range of integers from a to b.
function range(a, b) {
  const out = [];
  for (let i = a; i < b; i++) out.push(i);
  return out;
}

module.exports = { range };
