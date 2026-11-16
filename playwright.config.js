const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({ testDir: './tests', use: { baseURL: 'http://127.0.0.1:4176', channel: 'chromium' }, webServer: { command: 'npm start', url: 'http://127.0.0.1:4176' }, projects: [{name:'desktop',use:{viewport:{width:1280,height:800}}},{name:'mobile',use:{viewport:{width:320,height:700}}}] });
