'use strict';
const accounts = new Map([['a1', { id: 'a1', balance: 500 }]]);

function getAccount(id) {
  const acc = accounts.get(id);
  if (!acc) throw new Error(`unknown account ${id}`);
  return acc;
}

module.exports = { getAccount, accounts };
