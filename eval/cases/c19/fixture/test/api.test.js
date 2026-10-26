const test = require('node:test');
const assert = require('node:assert');
const { fetchUser } = require('../src/index');
test('fetch', async () => assert.equal((await fetchUser(1)).name, 'user1'));
