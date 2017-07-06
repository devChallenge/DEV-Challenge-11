const expect = require('chai').expect;
const request = require('request-promise');
const fork = require('child_process').fork;
const path = require('path');

const port = 30000;

const child = fork(path.join(__dirname, './02-sub.js'));

before(function(done){
  child.send({ message: 'start' });

  child.on('message', function() {
    done();
  });

  child.on('error', () => {});
});

describe('modules', function() {
  describe('Error handler', function() {
    it('should handle errors', async function() {
      await request.get({
        uri: `http://localhost:${port}/`,
        json: true
      }).catch(e => {
        expect(e.statusCode).to.be.equal(500);
        if (!/hello/.test(e.message)) {
          throw new Error('expecting message to containt \'hello\'');
        }
        child.kill('SIGINT');
      });
    });
  });
});
