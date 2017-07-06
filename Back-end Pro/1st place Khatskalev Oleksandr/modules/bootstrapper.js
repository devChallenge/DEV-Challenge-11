const http = require('http');

module.exports = function(config, middlewares, routes, errorHandler, dependencies) {
  console.log('starting to bootstrap');

  const app = dependencies.express();

  if (dependencies.bodyParser) {
    app.use(dependencies.bodyParser.json());
  }

  app.use(dependencies.helmet.hidePoweredBy());
  app.use(dependencies.helmet.xssFilter());

  for (let middleware of middlewares) {
    app.use(middleware);
  }

  config.additionalSetup.forEach(config => config(config, app));

  routes.forEach(route => route(app));

  app.use(errorHandler);

  const server = http.Server(app);
  server.listen(config.port, () => {
    console.log('finished bootsraping');
    console.log(`started on port: ${config.port}`);
  });

  return server;
};
