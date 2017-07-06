const expect = require('chai').expect;

const counters = {
  additionalSetupCounter: 0,
  bodyparserSetupCounter: 0,
  expressCallCounter: 0,
  poweredByCounter: 0,
  xssFilterCounter: 0,
  routesCounter: 0,
  useMethodCounter: 0
};

const additionalConfig = {
  additionalSetup: [function() {
    this.additionalSetupCounter++;
  }.bind(counters)],
  port: 22200
};

const bodyParser = {
  json: function() {
    this.bodyparserSetupCounter++;
  }.bind(counters)
};

const helmet = {
  hidePoweredBy: function() {
    this.poweredByCounter++;
  }.bind(counters),
  xssFilter: function() {
    this.xssFilterCounter++;
  }.bind(counters)
};

const routes = [
  function() {
    this.routesCounter++;
  }.bind(counters)
];

const middlewares = [
  function(req, res, next) {
    next();
  }
];

const express = function() {
  this.expressCallCounter++;

  const app = function() {};
  app.listen = () => {};
  app.use = function() {
    this.useMethodCounter++;
  }.bind(counters);

  return app;
}.bind(counters);

const dependencies = { express, bodyParser, helmet };

let errorHandler = function(){};

const oldWrite = process.stdout.write;
process.stdout.write = () => {};

const server = require('../modules/bootstrapper')(
  additionalConfig, middlewares, routes, errorHandler, dependencies);

process.stdout.write = oldWrite;

describe('modules', function() {
  describe('Bootstrapper', function() {
    it('should call express', function() {
      expect(counters.expressCallCounter).to.be.equal(1);
    });

    it('should call use method 5 times', function() {
      expect(counters.useMethodCounter).to.be.equal(5);
    });

    it('should call json method of bodyparser', function() {
      expect(counters.bodyparserSetupCounter).to.be.equal(1);
    });

    it('should call additional setup methods', function() {
      expect(counters.additionalSetupCounter).to.be.equal(1);
    });

    it('should call poweredByCounter method of helmet', function() {
      expect(counters.poweredByCounter).to.be.equal(1);
    });

    it('should call xssFilterCounter method of helmet', function() {
      expect(counters.xssFilterCounter).to.be.equal(1);
    });

    it('should call each route passed', function() {
      expect(counters.routesCounter).to.be.equal(1);
    });
  });
});

after(function() {
  server.close();
});