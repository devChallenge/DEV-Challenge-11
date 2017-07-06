const express = require('express');
const app = express();
const port = 30000;
const errorHandler = require('../modules/error-handler')();

app.get('/', function() {
  throw new Error('hello');
});

app.use(errorHandler);

process.stderr.write = () => {};

/**
 * Hack to ignore mocha enter
 */
process.on('message', function(data) {
  if (data.message === 'start') {
    app.listen(port, function() {
      if (process.send) process.send({ message: 'ready' });
    });
  } else process.exit(0);
});
