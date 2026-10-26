'use strict';
// Counts words in the given arguments.
function parse(argv) {
  return argv.join(' ').split(/\s+/).filter(Boolean).length;
}

module.exports = { parse };
