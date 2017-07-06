const expect = require('chai').expect;

const counters = {
  sigintHandler: 0,
  exitCall: 0,
  callbackCall : 0
};

const cb = function() {
  counters.callbackCall++;
};

const fakeProcess = {
  callbacks: [],
  on: function(eventName, callback) {
    if (eventName === 'SIGINT') {
      this.callbacks.push(callback);
      counters.sigintHandler++;
    }
  },
  emit: function (eventName) {
    if (eventName === 'SIGINT') {
      this.callbacks.forEach(callback => callback());
    }
  },
  exit: function () {
    counters.exitCall++;
  }
};

const gracefulShutdown = require('../modules/graceful-shutdown')(fakeProcess);
gracefulShutdown(cb);

describe('modules', function() {
  describe('graceful-shutdown', function() {
    it('should call callback function', function() {
      const stdout = process.stdout.write;
      process.stdout.write = () => {};
      fakeProcess.emit('SIGINT');
      process.stdout.write = stdout;

      expect(counters.sigintHandler).to.be.equal(1);
      expect(counters.exitCall).to.be.equal(1);
      expect(counters.callbackCall).to.be.equal(1);
    });
  });
});