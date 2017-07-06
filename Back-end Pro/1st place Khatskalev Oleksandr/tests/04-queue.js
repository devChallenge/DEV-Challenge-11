const chai = require('chai');
const expect = chai.expect;

let queue;

const counters = {
  queue: 0
};

beforeEach(function() {
  queue = require('../modules/queue')(50);
});

describe('modules', function() {
  describe('queue', function() {
    it('should do the task', function(done) {
      queue.push(async function() {
        this.queue++;
      }.bind(counters));
      setTimeout(function() {
        expect(this.queue).to.be.equal(1);
        done();
      }.bind(counters), 60);
    });
  });
});

afterEach(function() {
  queue.stop();
  queue = null;
});