// Reqire
const _ = require('lodash');

// ID

const genId = () => {
    return Math.random().toString(36).substr(2, 24);
}


// Date

const millisec = 1000;
const secMillisec = millisec * 1;
const minSec = 60;
const minMillisec = minSec * millisec;
const hourSec = minSec * 60;
const hourMillisec = hourSec * millisec;
const daySec = hourSec * 24;
const dayMillisec = daySec * millisec;

// Exports

module.exports = {
    id: {
        genId
    },
    date: {
        millisec,
        secMillisec,
        minSec,
        minMillisec,
        hourSec,
        hourMillisec,
        daySec,
        dayMillisec
    }
}