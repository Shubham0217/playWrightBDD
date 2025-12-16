const { request } = require('@playwright/test');

let apiContext;

async function createAPIContext() {
  apiContext = await request.newContext();
  return apiContext;
}

module.exports = { createAPIContext };
