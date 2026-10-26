process.env.TZ = 'America/Los_Angeles';
const test = require('node:test');
const assert = require('node:assert');
const { today, headerTitle } = require('../src/dates');

test('LA evening is still the local day', () => assert.equal(today(new Date('2026-03-10T05:30:00Z')), '2026-03-09'));
test('header uses the local day', () => assert.equal(headerTitle(new Date('2026-03-10T05:30:00Z')), 'Dashboard - 2026-03-09'));
test('LA morning', () => assert.equal(today(new Date('2026-03-09T18:00:00Z')), '2026-03-09'));
