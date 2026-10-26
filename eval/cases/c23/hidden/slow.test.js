const test = require('node:test');
const assert = require('node:assert');
const { createQueue } = require('../src/queue');

const job = (ms, v) => () => new Promise((r) => setTimeout(() => r(v), ms));

test('waits for slow jobs, results in push order', async () => { const q = createQueue(); q.push(job(150, 'a')); q.push(job(10, 'b')); assert.deepEqual(await q.drain(), ['a', 'b']); });
test('empty queue', async () => assert.deepEqual(await createQueue().drain(), []));
