const { defineConfig } = require("cypress");

const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

module.exports = defineConfig({
  e2e: {
    baseUrl: frontendUrl,
    env: {
      apiUrl,
    },
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
