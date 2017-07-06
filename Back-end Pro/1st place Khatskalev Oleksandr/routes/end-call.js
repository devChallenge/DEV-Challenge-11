module.exports = function(stateHandler) {
  return function(app) {
    /**
     * @api {get} /end-call
     * @apiName EndCall
     * @apiGroup Project
     *
     * @apiDescription signal about call finished
     *
     * @apiParam {String} EmployeeName the name of employee who had finished the call
     *
     * @apiError ServerError return 500 if any error occurs
     * @apiError ServerError return 400 if bad request
     * @apiSuccess {String} result ACCEPTED
     */
    app.get('/end-call', function(req, res) {
      const params = req.query;

      if (!params.EmployeeName) {
        return res.status(400).send({ message: 'Bad request' });
      }

      stateHandler.finishedCall(params.EmployeeName);
      res.send('ACCEPTED');
    });
  };
};
