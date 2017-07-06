// Utils
const async = require('async');
const log = require('./api/utils/log.js').withModule('app');
// Seed
const seed = require('./api/seed/seed.js');
// DB
const db = require('./api/services/db.js');
// App
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
// Init session
require('./api/services/session.js')(app);
// Init api
require('./api/controllers/api.js')(app);

// Static files (web app)
app.use(express.static('public'));
// Single page app route 
app.get('*', function(req, res) {
    let opt = {root: __dirname + '/public/'};
    res.sendFile('index.html', opt);
});

// Running server
log('running server');
async.series([
    cb => db.init(cb),
    cb => seed.init(cb),
    cb => app.listen(port, cb),
], err => {
    if(err){
        log.err(err);
        process.exit(1);
    }
    log('running server done, port: ' + port);
});