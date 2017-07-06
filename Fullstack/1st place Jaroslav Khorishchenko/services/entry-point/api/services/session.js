// Require
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

module.exports = (app) => {
    // Setting session
    app.use(session({
        store: new RedisStore({
            host: process.env.REDIS_HOST || 'redis',
            port: process.env.REDIS_PORT || 6379,
        }),
        resave: true,
        saveUninitialized: true,
        secret: process.env.EXPRESS_SESSION_SECRET,
    }));
}