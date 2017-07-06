let _handlers = [];

let on = (eventName, fn) => {
    _handlers.push({eventName, fn});
}

let emitLog = (data) => {
    emit('log', data);
}

let emit = (event, data) => {
    if(!_handlers || !_handlers.length) return;
    _handlers.forEach(({eventName, fn}) => {
        if(event == eventName) fn(data);
    });
}

function logFactory(m){

    function logPref(symb){
        return m ? '[' + symb + '][' + m + ']:' : '[' + symb + ']:';
    }

    function log(data){
        log.debug(data);
    }

    log.debug = (data) => {
        const pref = logPref('-');
        console.log(pref, data);
        log.emitLog(pref + ' ' + data);
    }

    log.info = (data) => {
        const pref = logPref('+');
        console.info(pref, data);
        log.emitLog(pref + ' ' + data);
    }

    log.warn = (data) => {
        const pref = logPref('!');
        console.warn(pref, data);
        log.emitLog(pref + ' ' + data);
    }

    log.error = (data) => {
        const pref = logPref('x');
        console.error(pref, data);
        log.emitLog(pref + ' ' + data);
    }

    log.err = (data) => {
        log.error(data);
    }

    log.on = (eventName, fn) => {
        on(eventName, fn);
    }

    log.emit = (event, data) => {
        emit(event, data);
    }

    log.emitLog = (data) => {
        emitLog(data);
    }

    log.withModule = (m) => {
        return logFactory(m);
    }

    return log;
}

module.exports = logFactory();