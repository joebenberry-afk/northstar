'use strict';
const { parsePort } = require('./port');

// config.json: { "port": 9000 }. Falls back to $PORT, then 3000.
function loadConfig(json) {
  const c = JSON.parse(json);
  return { port: parsePort(c.port ?? process.env.PORT ?? '3000') };
}

module.exports = { loadConfig };
