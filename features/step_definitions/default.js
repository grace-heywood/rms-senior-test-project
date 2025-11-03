const { request, settings } = require('pactum');
const { Before } = require('@cucumber/cucumber');

Before(() => {
  request.setBaseUrl('https://testapi.io');
  settings.setReporterAutoRun(false);
});