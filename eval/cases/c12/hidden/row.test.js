const test = require('node:test');
const assert = require('node:assert');
const { toCsvRow } = require('../src/csv');
test('plain', () => assert.equal(toCsvRow(['a', 'b', 'c']), 'a,b,c'));
test('comma', () => assert.equal(toCsvRow(['a,b', 'c']), '"a,b",c'));
test('quote', () => assert.equal(toCsvRow(['say "hi"']), '"say ""hi"""'));
test('newline', () => assert.equal(toCsvRow(['a\nb']), '"a\nb"'));
test('numbers', () => assert.equal(toCsvRow([1, 2]), '1,2'));
