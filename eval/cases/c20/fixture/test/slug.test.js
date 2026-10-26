const test = require('node:test');
const assert = require('node:assert');
const { slugify } = require('../src/slug');

test('punctuation', () => assert.equal(slugify('Hello, World!'), 'hello-world'));
test('accents', () => assert.equal(slugify('Café Crème'), 'cafe-creme'));
test('trim hyphens', () => assert.equal(slugify('--a--'), 'a'));
