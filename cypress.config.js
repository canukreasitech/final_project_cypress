const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://example.com',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'Final Project QA',
      embeddedScreenshots: true,
      inlineAssets: true,
    },
    env: {
      agodaUrl: 'https://www.agoda.com',
      amazonUrl: 'https://www.amazon.com',
      youtubeUrl: 'https://www.youtube.com/feed/trending',
    },
  },
})
