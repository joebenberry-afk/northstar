'use strict';
// Calendar date (YYYY-MM-DD) for the dashboard header.
function today(now = new Date()) {
  return now.toISOString().slice(0, 10);
}

function headerTitle(now = new Date()) {
  return `Dashboard - ${today(now)}`;
}

module.exports = { today, headerTitle };
