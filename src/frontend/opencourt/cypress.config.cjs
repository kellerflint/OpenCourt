const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    //matching the url with vite
    baseUrl: 'http://localhost:5173', 
    supportFile: false,
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
