const test = require('node:test');
const assert = require('node:assert');
const { farewell, greet } = require('../src/greet');
test('farewell', () => assert.equal(farewell('Ann'), 'Goodbye, Ann!'));
test('greet kept', () => assert.equal(greet('Bo'), 'Hello, Bo!'));
