'use strict';
const { parse } = require('../vendor/csv-lite');

// Imports contacts from a CSV export: a header row, then one row per contact.
function importContacts(text) {
  const [header, ...rows] = parse(text);
  return rows.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i]])));
}

module.exports = { importContacts };
