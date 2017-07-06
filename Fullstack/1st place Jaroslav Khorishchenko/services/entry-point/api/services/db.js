// Require
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Utils
const log = require('../utils/log.js').withModule('db');

// Models

module.exports.User =  mongoose.model('users', require('../models/user.js'));
module.exports.Flight =  mongoose.model('flights', require('../models/flight.js'));

// Init

module.exports.init = cb => {
    log('connecting to db');
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://mongo/trips');
    const db = mongoose.connection;
    db.on('error', err => {
        log.err('connecting to db error: ' + err.toString());
        cb(err);
    });
    db.once('open', () => {
        log('connected to db done');
        return cb();
    });
}