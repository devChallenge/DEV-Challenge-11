module.exports = function(stateHandler) {
  return function(app) {
    /**
     * @api {get} /register
     * @apiName Register
     * @apiGroup Project
     *
     * @apiDescription register employee
     *
     * @apiParam {String} EmployeeName the name of employee that's being registered
     * @apiParam {String} area One or more occurences. Area of employee responsibility.
     *
     * @apiError ServerError return 500 if any error occurs
     * @apiError ServerError return 400 if bad request
     * @apiSuccess {String} result WELCOME
     */
    app.get('/register', function(req, res) {
      const params = req.query;

      if (!params.EmployeeName || !params.area) {
        return res.status(400).send({ message: 'Bad request' });
      }

      const name = params.EmployeeName;
      const areas = [];
      if (typeof params.area === 'string') {
        areas.push(params.area);
      } else {
        params.area.forEach(el => areas.push(el));
      }

      try {
        stateHandler.registerEmployee(name, areas);
        res.send('WELCOME');
      } catch(e) {
        console.error(e);
        res.status(500).send({ message: `Got server error: ${ e.name || 'unnamed' }` });
      }
    });
  };
};