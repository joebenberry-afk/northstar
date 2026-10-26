const test = require('node:test');
const assert = require('node:assert');
const { handle } = require('../src/server');

test('health', () => assert.equal(handle('health').body, 'ok'));
