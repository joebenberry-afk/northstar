const test = require('node:test');
const assert = require('node:assert');
const { upload } = require('../src/uploader');
const { parseArgs } = require('../cli');

function flaky(failures) {
  let calls = 0;
  const send = async () => { calls++; if (calls <= failures) throw new Error('fail ' + calls); return 'ok'; };
  return { send, calls: () => calls };
}

test('retries until success', async () => {
  const f = flaky(2);
  assert.equal(await upload('a', { send: f.send, retry: 2 }), 'ok');
  assert.equal(f.calls(), 3);
});
test('rethrows the last error', async () => {
  const f = flaky(5);
  await assert.rejects(upload('a', { send: f.send, retry: 1 }), /fail 2/);
  assert.equal(f.calls(), 2);
});
test('no retry by default', async () => {
  const f = flaky(1);
  await assert.rejects(upload('a', { send: f.send }), /fail 1/);
  assert.equal(f.calls(), 1);
});
test('cli parses --retry after the file', () => {
  const o = parseArgs(['f.txt', '--retry', '3']);
  assert.equal(o.file, 'f.txt');
  assert.equal(o.retry, 3);
  assert.equal(parseArgs(['f.txt']).retry, 0);
});
test('cli parses --retry before the file', () => {
  const o = parseArgs(['--retry', '2', 'f.txt']);
  assert.equal(o.file, 'f.txt');
  assert.equal(o.retry, 2);
});
