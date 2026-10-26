'use strict';
const { getAccount } = require('./accounts');

function charge(id, cents) {
  const acc = getAccount(id);
  if (acc.balance < cents) throw new Error('insufficient funds');
  acc.balance -= cents;
  return acc.balance;
}

module.exports = { charge };
