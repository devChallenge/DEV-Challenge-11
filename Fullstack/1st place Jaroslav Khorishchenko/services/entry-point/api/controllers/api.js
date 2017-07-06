// Helpers
const log = require('../utils/log.js').withModule('app');
const Errors = require('../utils/errors.js');
const errors = Errors.withDomain('com.app.entry-point');
// DB
const db = require('../services/db.js');
const User = db.User;
const Flight = db.Flight;
// Libs
const _ = require('lodash');
// Const
const pack = require('../../package.json');
const apiRoot = '/api/v1'

// Middleware

const authRequired = (req, res, next) => {
    let sess = req.session;
    if(!sess.userId) return res.err(errors.unauthorized('Auth required'));
    User.findById(sess.userId, (err, user) => {
        if(!user) return res.err(errors.unauthorized('Auth required'));
        req.user = user;
        next();
    });
} 

const operatorRequired = (req, res, next) => {
    let user = req.user;
    if(user.role !== User.roles.OPERATOR) return res.err(errors.accessForbiden('Operator permissions required'));
    next();
}

// Init
module.exports = (app) => {
    // Parse JSON body
    app.use(require('body-parser').json({limit: '1mb'}));

    // Adding cusomt responses
    app.use((req, res, next) => {
        res.err = (err) => {
            if(!err) err = errors.unknowErr();
            if(err && !err.code) err = errors.unknowErr(err.toString(err));
            if(typeof err.toJSON === 'function'){
                err = errors.reqDataErr(err.toJSON());
            }
            res.status(err.code).json(Errors.withoutCode(err));
        };
        res.result = (data) => {
            res.status(200).json(data);
        }
        next();
    });

    // Base

    app.get(apiRoot, (req, res) => {
        // Getting information about the API
        return res.result({version: pack.version});
    });

    // Sign in
    app.post(apiRoot + '/auth/signin', (req, res) => {
        const params = req.body;
        if(!params.email) return res.err(errors.reqParamMissed('email'));
        if(!params.pass) return res.err(errors.reqParamMissed('pass'));
        const {email, pass} = params;
        User.userWithEmailAndPass(email, pass, (err, user) => {
            if(err) return res.err(err);
            if(!user) return res.err(errors.unauthorized());
            req.session.userId = user.id;
            return res.result(user.data());
        });
    });

    // Sign out
    app.post(apiRoot + '/auth/signout', authRequired, (req, res) => {
        let sess = req.session;
        sess.userId = null;
        res.result();
    });

    // Get current user info
    app.get(apiRoot + '/me', authRequired, (req, res) => {
        res.result(req.user.data());
    });


    // List flights
    app.get(apiRoot + '/flights', (req, res) => {
        let dbReq = {};
        const params = req.query;
        if(params.id !== undefined) dbReq.id = params.id;
        Flight.find(dbReq, (err, flights) => {
            if(err) return cb(err);
            res.result(_.map(flights, item => item.data()));
        });
    });

    // Add flight
    app.put(apiRoot + '/flights', authRequired, operatorRequired, (req, res) => {
        const params = req.query;
        if(params.id === undefined) return res.err(errors.reqParamMissed('id'));
        if(params.start === undefined) return res.err(errors.reqParamMissed('start'));
        if(params.duration === undefined) return res.err(errors.reqParamMissed('duration'));
        if(params.origin === undefined) return res.err(errors.reqParamMissed('origin'));
        if(params.destination === undefined) return res.err(errors.reqParamMissed('destination'));
        if(params.cost === undefined) return res.err(errors.reqParamMissed('cost'));
        const {id, start, duration, origin, destination, cost} = params;
        const flightData = {id, start, duration, origin, destination, cost};
        Flight.add(flightData, (err, flightData) => {
            if(err && err.code == 11000) return res.err(errors.reqDataErr('flight with id exists'));
            if(err) return res.err(err);
            return res.result({});
        });
    });

    // Update flight
    app.post(apiRoot + '/flights', authRequired, operatorRequired, (req, res) => {
        const params = req.query;
        if(params.id === undefined) return res.err(errors.reqParamMissed('id'));
        const { id } = params;
        const flightData = params;
        Flight.findOne({id}, (err, flight) => {
            if(err) return res.err(err);
            if(!flight) return res.err(errors.notFound('flight not found'));
            flight.update(params, (err, newFlight) => {
                if(err) return res.err(err);
                return res.result({});
            });
        });
    });

    // Delete flight with id
    app.delete(apiRoot + '/flights', authRequired, operatorRequired, (req, res) => {
        const params = req.query;
        if(params.id === undefined) return res.err(errors.reqParamMissed('id'));
        const { id } = params;
        Flight.findOne({ id }, (err, flight) => {
            if(err) return res.err(err);
            if(!flight) return res.err(errors.notFound('flight not found'));
            flight.remove(err => {
                if(err) return res.err(err);
                return res.result({});
            });
        });
    });


    // List trips

    app.get(apiRoot + '/trips', (req, res) => {
        let params = req.query;
        // Required
        if(params.origin === undefined) return res.err(errors.reqParamMissed('origin'));
        if(params.destination === undefined) return res.err(errors.reqParamMissed('destination'));
        // Default params
        if(!params.efficiency) params.efficiency = 'cost';
        // Prepare
        params.origin = params.origin.trim().toLowerCase();
        params.destination = params.destination.trim().toLowerCase();

        const demoData = [
            {
                flights: ["1", "3"],
                time: 180,
                price: 400,
                connections: 2,
            },
            {
                flights: ["4", "5"],
                time: 200,
                price: 500,
                connections: 2,
            }
        ]
        // Temporary response
        res.result(demoData);
    });


    // Default
    app.all(apiRoot + '*', (req, res) => {
        res.err(errors.apiNotFound());
    });
    
}