'use strict';
const { upload } = require('./src/uploader');

function parseArgs(argv) {
  const opts = { file: null };
  for (const a of argv) {
    if (!opts.file) opts.file = a;
  }
  return opts;
}

if (require.main === module) {
  const opts = parseArgs(process.argv.slice(2));
  const send = async (f) => { console.log(`uploaded ${f}`); return 'ok'; };
  upload(opts.file, { send }).catch((e) => { console.error(e.message); process.exit(1); });
}

module.exports = { parseArgs };
