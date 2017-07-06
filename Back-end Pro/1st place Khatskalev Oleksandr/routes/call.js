module.exports = function(stateHandler) {
  return function(app) {
    /**
     * @api {get} /call
     * @apiName Call
     * @apiGroup Project
     *
     * @apiDescription register call(s) in the queue
     *
     * @apiParam {String} area Multiple/single area - pointing to each call
     *
     * @apiError ServerError return 500 if any error occurs
     * @apiError ServerError return 400 if bad request
     * 
     * @apiSuccess {Object} result set of results
     */
    app.get('/call', function(req, res) {
      const params = req.query;

      if (!params.area) {
        return res.status(400).send({ message: 'Bad request' });
      }

      const areas = [];
      if (typeof params.area === 'string') {
        areas.push(params.area);
      } else {
        params.area.forEach(el => areas.push(el));
      }

      try {
        const assignments = stateHandler.registerCalls(areas);
        const totalAssignments = assignments.filter(el => el.employee).length.toString();
        return res.send({ totalAssignments, assignments });
      } catch (e) {
        console.error(e);
        return res.status(500).send({ message: `Got server error: ${ e.name || 'unnamed' }` });
      }
    });
  };
};
