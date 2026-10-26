const test = require('node:test');
const assert = require('node:assert');
const { slugify } = require('../src/slug');

test('fits exactly', () => assert.equal(slugify('hello big world', { maxLength: 9 }), 'hello-big'));
test('cuts at boundary', () => assert.equal(slugify('hello big world', { maxLength: 8 }), 'hello'));
test('hard cut without boundary', () => assert.equal(slugify('abcdefghij', { maxLength: 4 }), 'abcd'));
test('no trailing hyphen', () => assert.equal(slugify('a b', { maxLength: 2 }), 'a'));
test('unchanged without option', () => { assert.equal(slugify('Hello, World!'), 'hello-world'); assert.equal(slugify('Café Crème'), 'cafe-creme'); });
