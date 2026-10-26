const test = require('node:test');
const assert = require('node:assert');
const { importContacts } = require('../src/import');

test('no trailing newline keeps the last contact', () => assert.deepEqual(importContacts('name,email\nAda,ada@x.io\nBo,bo@x.io'), [{ name: 'Ada', email: 'ada@x.io' }, { name: 'Bo', email: 'bo@x.io' }]));
test('trailing newline still works', () => assert.equal(importContacts('name,email\nAda,ada@x.io\n').length, 1));
