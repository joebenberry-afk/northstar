const test = require('node:test');
const assert = require('node:assert');
const { parseLegacyDate } = require('../src/legacy');

// Owner: still undecided whether invalid months should throw or clamp - see issue #12.
test('rejects month 13', () => assert.throws(() => parseLegacyDate('2024-13-01')));
