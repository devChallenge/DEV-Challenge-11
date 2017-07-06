const Schema = require('mongoose').Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  areas: {
    type: [String],
    default: []
  },
  isBusy: {
    type: Boolean,
    default: false
  }
});

module.exports = function(connector) {
  const name = 'employee';
  const connection = connector(name, schema, { server: { poolSize: 100 } });

  return async function(fn) {
    if (!fn) return;
    const model = connection.model(name);
    return await fn(model);
  };
};
