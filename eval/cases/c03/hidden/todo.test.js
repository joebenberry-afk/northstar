const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const todo = require('../src/todo');

test('add assigns increasing ids', () => {
  let l = todo.add([], 'a');
  l = todo.add(l, 'b');
  assert.deepEqual(l.map((i) => [i.id, i.text, i.done]), [[1, 'a', false], [2, 'b', false]]);
});
test('add does not mutate', () => { const l = []; todo.add(l, 'a'); assert.equal(l.length, 0); });
test('complete', () => {
  const l = todo.complete(todo.add([], 'a'), 1);
  assert.equal(l[0].done, true);
  assert.throws(() => todo.complete(l, 99));
});
test('remove', () => {
  const l = todo.remove(todo.add(todo.add([], 'a'), 'b'), 1);
  assert.deepEqual(l.map((i) => i.id), [2]);
});
test('load/save', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'todo-'));
  const f = path.join(dir, 't.json');
  assert.deepEqual(todo.load(f), []);
  todo.save(f, todo.add([], 'x'));
  assert.equal(todo.load(f)[0].text, 'x');
});
test('cli round trip', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'todo-cli-'));
  const cli = path.join(__dirname, '..', 'cli.js');
  const run = (...a) => execFileSync(process.execPath, [cli, ...a], { cwd: dir, encoding: 'utf8' });
  run('add', 'milk');
  run('add', 'eggs');
  run('done', '1');
  const out = run('list');
  assert.match(out, /milk/);
  assert.match(out, /eggs/);
  const saved = JSON.parse(fs.readFileSync(path.join(dir, 'todo.json'), 'utf8'));
  assert.equal(saved.find((i) => i.id === 1).done, true);
});
