'use strict';
const http = require('node:http');

const notes = [];

function handler(req, res) {
  if (req.method === 'GET' && req.url === '/notes') {
    res.writeHead(200, { 'content-type': 'application/json' });
    return res.end(JSON.stringify(notes));
  }
  if (req.method === 'POST' && req.url === '/notes') {
    let body = '';
    req.on('data', (c) => (body += c));
    return req.on('end', () => {
      notes.push(JSON.parse(body));
      res.writeHead(201);
      res.end();
    });
  }
  res.writeHead(404);
  res.end();
}

if (require.main === module) http.createServer(handler).listen(3000);
module.exports = { handler };
