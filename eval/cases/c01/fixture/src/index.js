'use strict';
const notes = [];
function add(text) { notes.push(text); return notes.length; }
module.exports = { add };
