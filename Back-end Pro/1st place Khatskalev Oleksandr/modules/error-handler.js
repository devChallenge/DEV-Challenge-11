module.exports =  function() {
  return function(err, req, res, next) {
    if (err) {
      console.error(err, `method: ${req.method}, url: ${req.url}, ip: ${req.connection.remoteAddress}`);
      return res.status(500).send({message: err.message});
    } else {
      return next();
    }
  };
};