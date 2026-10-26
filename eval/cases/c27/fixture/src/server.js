'use strict';
// Route table; the HTTP layer calls handle(route, query).
const routes = {
  health: () => ({ status: 200, body: 'ok' }),
};

function handle(route, query = {}) {
  const fn = routes[route];
  return fn ? fn(query) : { status: 404, body: 'no route' };
}

module.exports = { handle, routes };
