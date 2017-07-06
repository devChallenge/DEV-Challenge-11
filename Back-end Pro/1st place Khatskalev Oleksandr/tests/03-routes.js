const express = require('express');
const app = express();
const getport = require('getport');
const request = require('request-promise');
const expect = require('chai').expect;

const http = require('http');
let APP_URL;
const APP_SERVER = http.Server(app);

const stateHandler = require('./mocks').stateHandler;

const callRoute = require('../routes/call')(stateHandler);
const endCallRoute = require('../routes/end-call')(stateHandler);
const registerRoute = require('../routes/register')(stateHandler);
const resetRoute = require('../routes/reset')(stateHandler);

before(function(done) {
  getport(10000, 20000, function(e, port) {
    if (e) return console.error(e);

    APP_URL = `http://localhost:${port}/`;
    APP_SERVER.listen(port, function() {
      // Init routes
      callRoute(app);
      endCallRoute(app);
      registerRoute(app);
      resetRoute(app);

      done();
    });
  });
});

describe('routes', function() {
  describe('call', function() {
    it('should get /call', async function() {
      const link = 'call?area=bills&area=leases&area=bills';

      const url = `${APP_URL}${link}`;
      const response = await request.get({
        url,
        json: true
      });
      expect(response.totalAssignments).to.be.equal('0');
    });
  });

  describe('end-call', function() {
    it('should get /end-call', async function() {
      const link = 'end-call?EmployeeName=some';

      const url = `${APP_URL}${link}`;
      const response = await request.get({
        url,
        json: true
      });
      expect(response).to.be.equal('ACCEPTED');
    });
  });

  describe('register', function() {
    it('should get /register', async function() {
      const link = 'register?EmployeeName=some&area=sports';

      const url = `${APP_URL}${link}`;
      const response = await request.get({
        url,
        json: true
      });
      expect(response).to.be.equal('WELCOME');
    });
  });

  describe('reset', function() {
    it('should get /reset', async function() {
      const link = 'reset';

      const url = `${APP_URL}${link}`;
      const response = await request.get({
        url,
        json: true
      });
      expect(response).to.be.equal('SUCCESS');
    });
  });

});


after(function(done) {
  APP_SERVER.close(function() {
    done();
  });
});