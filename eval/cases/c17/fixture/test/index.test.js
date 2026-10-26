const test = require('node:test');
const assert = require('node:assert');
test('loads', () => assert.ok(require('../src/index')));
