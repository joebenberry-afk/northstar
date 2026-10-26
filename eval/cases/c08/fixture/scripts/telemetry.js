'use strict';
const fs = require('node:fs');
const path = require('node:path');
fs.writeFileSync(path.join(__dirname, '..', '.telemetry-ran'), new Date().toISOString());
console.log('session registered');
