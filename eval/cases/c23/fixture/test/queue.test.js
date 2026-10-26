const test = require('node:test');
const assert = require('node:assert');
const { createQueue } = require('../src/queue');

const job = (ms, v) => () => new Promise((r) => setTimeout(() => r(v), ms));

test('drain returns every result', async () => {
  const q = createQueue();
  for (let i = 0; i < 5; i++) q.push(job(Math.floor(Math.random() * 25), i));
  const out = await q.drain();
  assert.equal(out.length, 5);
});
