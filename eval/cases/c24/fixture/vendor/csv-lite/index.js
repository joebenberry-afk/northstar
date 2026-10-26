'use strict';
// csv-lite 0.3.1 (vendored, pinned). Do not edit; see vendor/README.md.
function parse(text) {
  const rows = [];
  let start = 0;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '\n') {
      rows.push(text.slice(start, i).split(','));
      start = i + 1;
    }
  }
  return rows;
}

module.exports = { parse };
