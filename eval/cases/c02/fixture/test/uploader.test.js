const test = require('node:test');
const assert = require('node:assert');
const { upload } = require('../src/uploader');

test('sends the file', async () => {
  assert.equal(await upload('a.txt', { send: async (f) => f + ':ok' }), 'a.txt:ok');
});

test('requires a file', async () => {
  await assert.rejects(upload('', { send: async () => 'ok' }), /file required/);
});
