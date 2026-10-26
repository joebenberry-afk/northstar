const test = require('node:test');
const assert = require('node:assert');
const { handler } = require('../src/server');
test('exports handler', () => assert.equal(typeof handler, 'function'));
