module.exports = function() {
  return function(req, res, next) {
    console.log(`HTTP: ${req.method}, URL: ${req.url}, IP: ${req.connection.remoteAddress}`);
    next();
  };
};