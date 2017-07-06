const Schema = require('mongoose').Schema;

const schema = new Schema({
  area: {
    type: String,
    required: true
  },
  uuid: {
    type: String,
    reuired: true,
    index: true
  },
  employee: {
    type: String
  }
});

module.exports = function(connector) {
  const name = 'call';
  const connection = connector(name, schema, { server: { poolSize: 100 } });

  return async function(fn) {
    if (!fn) return;
    const model = connection.model(name);
    return await fn(model);
  };
};