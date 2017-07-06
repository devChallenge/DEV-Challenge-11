module.exports = {
  port: process.env.MY_APP_PORT || 3000,
  connectionString: process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017/devchallenge',
  queueDelay: 500
};