'use strict';
function capitalize(s) {
  const t = String(s);
  return t.charAt(0).toUpperCase() + t.slice(1);
}

module.exports = { capitalize };
