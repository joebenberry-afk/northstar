const test = require('node:test');
const assert = require('node:assert');
const { today, headerTitle } = require('../src/dates');

test('format', () => assert.match(today(), /^\d{4}-\d{2}-\d{2}$/));
test('header', () => assert.match(headerTitle(), /^Dashboard - \d{4}-\d{2}-\d{2}$/));
