const { Before, After } = require('@cucumber/cucumber');
const { launchBrowser, closeBrowser } = require('../utils/browserManager');

Before(async () => {
  await launchBrowser();
});

After(async () => {
  await closeBrowser();
});
