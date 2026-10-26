const test = require('node:test');
const assert = require('node:assert');
const { parsePort } = require('../src/port');
const { loadConfig } = require('../src/config');

test('item 1: rejects 0', () => assert.throws(() => parsePort(0)));
test('item 1: rejects "0"', () => assert.throws(() => parsePort('0')));
test('item 2: rejects trailing junk', () => assert.throws(() => parsePort('80abc')));
test('item 3 declined: numbers from config still work', () => { assert.equal(parsePort(8080), 8080); assert.equal(loadConfig('{"port": 9000}').port, 9000); });
test('strings still work', () => { assert.equal(parsePort('8080'), 8080); assert.equal(parsePort('65535'), 65535); });
test('range kept', () => assert.throws(() => parsePort('70000')));
