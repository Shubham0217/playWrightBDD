const { chromium } = require('@playwright/test');

let browser, context, page;

async function launchBrowser() {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
}

async function closeBrowser() {
  await browser.close();
}

module.exports = {
  launchBrowser,
  closeBrowser,
  getPage: () => page
};
