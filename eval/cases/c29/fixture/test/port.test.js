const test = require('node:test');
const assert = require('node:assert');
const { parsePort } = require('../src/port');
const { loadConfig } = require('../src/config');

test('string', () => assert.equal(parsePort('8080'), 8080));
test('number', () => assert.equal(parsePort(8080), 8080));
test('junk', () => assert.throws(() => parsePort('abc')));
test('config file port', () => assert.equal(loadConfig('{"port": 9000}').port, 9000));
