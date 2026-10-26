process.env.TZ = 'Asia/Tokyo';
const test = require('node:test');
const assert = require('node:assert');
const { today } = require('../src/dates');

test('Tokyo early morning is already the next local day', () => assert.equal(today(new Date('2026-03-09T20:00:00Z')), '2026-03-10'));
