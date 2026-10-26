const test = require('node:test');
const assert = require('node:assert');
const { capitalize } = require('../src/str');
test('capitalize', () => { assert.equal(capitalize('hello World'), 'Hello World'); assert.equal(capitalize(''), ''); });
