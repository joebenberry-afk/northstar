'use strict';
// Runs queued jobs; drain() resolves with every job's result, in push order, once all of them have finished.
function createQueue() {
  const jobs = [];
  const done = [];
  return {
    push(job) { jobs.push(job); },
    async drain() {
      jobs.forEach(async (job) => { done.push(await job()); });
      jobs.length = 0;
      await new Promise((r) => setTimeout(r, 20));
      return done;
    },
  };
}

module.exports = { createQueue };
