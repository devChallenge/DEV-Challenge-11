// Require
const async = require('async');
const db = require('../services/db.js');
const log = require('../utils/log.js').withModule('seed');
// Data
const usersData = require('./users.json');
const flightsData = require('./flights.json');

// Users
const initUsers = cb => {
    async.eachSeries(usersData, (userData, cb) => {
        const id = userData._id;
        db.User.findById(id, (err, user) => {
            if(user) return cb();
            log('user ' + userData.firstName + ' ' + userData.lastName + ' not found');
            log('creating user');
            db.User.create(userData, (err, user) => {
                if(err) log.err(err);
                else log('creating user done');
                return cb();
            });
        });
    }, cb);
}

// Flights
const initFlights = cb => {
    async.eachSeries(flightsData, (flightData, cb) => {
        db.Flight.find({id: flightData.id}, (err, flights) => {
            if(flights && flights.length) return cb();
            log('creating flight with id: ' + flightData.id);
            db.Flight.create(flightData, (err, flight) => {
                if(err) log.err(err);
                else log('creating flight done');
                return cb();
            });
        });
    }, cb);
}

module.exports.init = (cb) => {
    async.series([
        (cb) => initUsers(cb),
        (cb) => initFlights(cb),
    ], cb);
}