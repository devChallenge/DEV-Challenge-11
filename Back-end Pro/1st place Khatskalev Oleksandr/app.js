const express = require('express');
const helmet = require('helmet');

const config = require('./config');

const gracefulShutdown = require('./modules/graceful-shutdown')(process);
const connector = require('./modules/connector')(config.connectionString, gracefulShutdown);
const callModel = require('./models/call')(connector);
const employeeModel = require('./models/employee')(connector);
const finder = require('./modules/finder')();
const queue = require('./modules/queue')(config.queueDelay);
const stateHandler = require('./modules/state-handler')(callModel, employeeModel, queue, finder);

// Middlewares
const errorHandler = require('./modules/error-handler')();
const httpLogger = require('./modules/http-log')();

const middlewares = [ httpLogger ];

// Routes
const registerRoute = require('./routes/register')(stateHandler);
const callRoute = require('./routes/call')(stateHandler);
const resetRoute = require('./routes/reset')(stateHandler);
const endCallRoute = require('./routes/end-call')(stateHandler);

const routes = [
  registerRoute,
  callRoute,
  resetRoute,
  endCallRoute
];

const additionalConfig = {
  additionalSetup: [],
  port: config.port
};

// Tie all together
const dependencies = { express, helmet };

// Bootstrap application
const server = require('./modules/bootstrapper')(
  additionalConfig, middlewares, routes, errorHandler, dependencies);

gracefulShutdown(function() {
  console.log('Shutting http server down');
  server.close();
});
