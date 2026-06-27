const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    supportFile: 'cypress/support/e2e.js',
    // 1. Добавяме вашия baseUrl
    baseUrl: 'https://dev.admin.avtoikonom.com',

    setupNodeEvents(on, config) {
      // 2. Обединяваме логиката за браузъра тук
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' || browser.name === 'edge') {
          launchOptions.args.push('--disable-notifications');
        }
        return launchOptions;
      });
    },
  },
});

