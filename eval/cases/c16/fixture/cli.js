#!/usr/bin/env node
'use strict';
const { parse } = require('./src/parse');

console.log(parse(process.argv.slice(2)));
