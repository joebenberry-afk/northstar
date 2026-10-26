const test = require('node:test');
const assert = require('node:assert');
const { charge } = require('../src/billing');
const { balanceOf } = require('../src/report');
const { formatCents } = require('../src/format');

test('balance', () => assert.equal(balanceOf('a1'), 500));
test('charge', () => assert.equal(charge('a1', 100), 400));
test('format', () => assert.equal(formatCents(-1505), '-$15.05'));
