'use strict';
// Parses YYYY-MM-DD. Kept for the old import job.
function parseLegacyDate(s) {
  const [y, m, d] = s.split('-').map(Number);
  return { y, m, d };
}

module.exports = { parseLegacyDate };
