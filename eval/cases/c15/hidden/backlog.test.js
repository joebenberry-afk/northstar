const test = require('node:test');
const assert = require('node:assert');
const lib = require('../src/lib');
test('B1 wordCount', () => { assert.equal(lib.wordCount('a  b\tc'), 3); assert.equal(lib.wordCount(''), 0); assert.equal(lib.wordCount('   '), 0); });
test('B2 titleCase', () => assert.equal(lib.titleCase('hELLO wORLD'), 'Hello World'));
test('B3 uniq', () => assert.deepEqual(lib.uniq([3, 1, 3, 2, 1]), [3, 1, 2]));
test('B5 chunk', () => { assert.deepEqual(lib.chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]); assert.throws(() => lib.chunk([1], 0)); });
test('B6 deepEqual', () => {
  assert.equal(lib.deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] }), true);
  assert.equal(lib.deepEqual({ a: 1 }, { a: 1, b: undefined }), false);
  assert.equal(lib.deepEqual([1, 2], [2, 1]), false);
  assert.equal(lib.deepEqual(1, '1'), false);
});
