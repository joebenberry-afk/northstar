const test = require('node:test');
const assert = require('node:assert');
const { r } = require('../src/report');
test('report', () => assert.equal(r([{ n: 'a', v: 1 }, { n: 'b', v: 2 }]), 'a: 1\nb: 2'));
