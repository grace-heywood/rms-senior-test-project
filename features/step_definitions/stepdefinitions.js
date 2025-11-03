const pactum = require('pactum');
const { expect } = require('chai')
const { Given, When, Then, Before } = require('@cucumber/cucumber');

let spec = pactum.spec();

Before(() => {
  spec = pactum.spec();
});
Given(/user makes a (.*) request to (.*)/, async function (method, endpoint) {
  await spec[method.toLowerCase()](endpoint);
});

When('request is successful with a status {int}', function (code) {
  spec.response().should.have.status(code);
});

Then('response time should be less than {int} ms', function (ms) {
  spec.response().should.have.responseTimeLessThan(ms)
});

Then('id field is never null or empty', async function () {
  await spec.expect(ctx => {
    for (let i = 0; i < ctx.res.body.data.length; i++) {
      expect(ctx.res.body.data[i].id).not.to.equal(null);
      expect(ctx.res.body.data[i].id).not.to.equal('');
    }
  });
});

Then('only one track in the list has now_playing as true', async function() {
  await spec.expect(ctx => {
    let nowPlayingStatus = 0;
    for (let i = 0; i < ctx.res.body.data.length; i++) {
      if (ctx.res.body.data[i].offset.now_playing == true) {
        nowPlayingStatus++
      }
    }
    expect(nowPlayingStatus).to.equal(1);
  });
});

Then('header should contain current date', async function() {
    await spec.expect(ctx => {
    const currentInHeader = new Date(ctx.res.headers.date)
    expect(currentInHeader.getTime()).to.not.be.NaN;
  });
});
