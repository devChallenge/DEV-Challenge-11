module.exports = function(stateHandler) {
  /**
   * @api {get} /reset
   * @apiName Reset
   * @apiGroup Project
   *
   * @apiDescription reset all the current state of the server (calls + employees)
   *
   * @apiError ServerError return 500 if any error occurs
   * @apiError ServerError return 400 if bad request
   * @apiSuccess {String} result SUCCESS
   */
  return function(app) {
    app.get('/reset', function(req, res) {
      stateHandler.reset();
      res.send('SUCCESS');
    });
  };
};