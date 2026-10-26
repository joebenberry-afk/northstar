'use strict';
const { getAccount } = require('./accounts');

function balanceOf(id) {
  return getAccount(id).balance;
}

module.exports = { balanceOf };
