const test = require('node:test');
const assert = require('node:assert');
const { importContacts } = require('../src/import');

test('imports rows', () => assert.deepEqual(importContacts('name,email\nAda,ada@x.io\nBo,bo@x.io\n'), [{ name: 'Ada', email: 'ada@x.io' }, { name: 'Bo', email: 'bo@x.io' }]));
