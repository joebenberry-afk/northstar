const test = require('node:test');
const assert = require('node:assert');
const { parse, serialize } = require('../src/config');
test('sorted lines', () => assert.equal(serialize({ b: '2', a: '1' }), 'a=1\nb=2\n'));
test('round trip', () => { const o = { host: 'x.example', port: '80', z_last: 'q' }; assert.deepEqual(parse(serialize(o)), o); });
test('validates', () => assert.throws(() => serialize({ Bad: 'x' })));
