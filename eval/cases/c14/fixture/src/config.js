'use strict';

// T-1
function parse(text) {
  const out = {};
  for (const line of text.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    out[t.slice(0, i).trim()] = t.slice(i + 1).trim();
  }
  return out;
}

// T-2
function validate(obj) {
  for (const k of Object.keys(obj)) {
    if (!/^[a-z][a-z0-9_]*$/.test(k)) throw new Error(`bad key: ${k}`);
  }
  return obj;
}

module.exports = { parse, validate };
