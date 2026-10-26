const test = require('node:test');
const assert = require('node:assert');
const { parse } = require('../src/parser');
test('counts', () => assert.equal(parse(['hello world', 'x']), 3));
