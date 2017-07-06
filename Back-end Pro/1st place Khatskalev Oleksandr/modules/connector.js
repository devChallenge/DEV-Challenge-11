const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

/**
 * Module to create connection to database for particular model
 * Also compiles model
 */
module.exports = function(connectionString, gracefulShutdown) {
  return function(name, schema, options) {
    const connection = mongoose.createConnection(connectionString, options);
    connection.on('error', e => console.error(`Got mongo error for model ${name}, err: ${e.message}`));
    connection.on('connected', () => {
      console.log(`Mongo connection for model ${name} is opened`);
      connection.model(name, schema);
      console.log(`Compiled model: ${name}`);
    });
    connection.on('disconnected', () =>
      console.log(`Mongo connection for model ${name} disconnected, trying to reconnect`));

    // add graceful shutdown functions
    gracefulShutdown(function() {
      console.log(`Closed connection for model: ${name}`);
      connection.close();
    });

    return connection;
  };
};