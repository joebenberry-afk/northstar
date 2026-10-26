const test = require('node:test');
const assert = require('node:assert');
const { parse, validate } = require('../src/config');
test('parse', () => assert.deepEqual(parse('a=1\n# c\nb = 2\n'), { a: '1', b: '2' }));
test('validate', () => { assert.throws(() => validate({ Bad: 1 })); assert.deepEqual(validate({ ok_1: 1 }), { ok_1: 1 }); });
