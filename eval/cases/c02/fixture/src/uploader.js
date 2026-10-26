'use strict';
// Sends a file through the injected transport. Transport errors propagate.
async function upload(file, { send }) {
  if (!file) throw new Error('file required');
  return send(file);
}

module.exports = { upload };
