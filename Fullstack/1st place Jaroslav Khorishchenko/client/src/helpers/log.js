/* eslint-disable no-console */
const handlers = [];

const on = (eventName, fn) => {
  handlers.push({ eventName, fn });
};

const emit = (event, data) => {
  if (!handlers || !handlers.length) return;
  handlers.forEach(({ eventName, fn }) => {
    if (event === eventName) fn(data);
  });
};

const emitLog = (data) => {
  emit('log', data);
};

let isEnabled = true;

function logFactory(m) {
  function logPref(symb) {
    return m ? `[${symb}][${m}]:` : `[${symb}]:`;
  }

  function log(data) {
    log.debug(data);
  }

  log.enabled = (val) => {
    isEnabled = val;
  };

  log.debug = (data) => {
    if (!isEnabled) return;
    const pref = logPref('-');
    console.log(pref, data);
    log.emitLog(`${pref} ${data}`);
  };

  log.info = (data) => {
    if (!isEnabled) return;
    const pref = logPref('+');
    console.info(pref, data);
    log.emitLog(`${pref} ${data}`);
  };

  log.warn = (data) => {
    if (!isEnabled) return;
    const pref = logPref('!');
    console.warn(pref, data);
    log.emitLog(`${pref} ${data}`);
  };

  log.error = (data) => {
    if (!isEnabled) return;
    const pref = logPref('x');
    console.error(pref, data);
    log.emitLog(`${pref} ${data}`);
  };

  log.err = (data) => {
    log.error(data);
  };

  log.on = (eventName, fn) => {
    on(eventName, fn);
  };

  log.emit = (event, data) => {
    emit(event, data);
  };

  log.emitLog = (data) => {
    emitLog(data);
  };

  log.withModule = moduleName => logFactory(moduleName);

  return log;
}

export default logFactory();
/* eslint-enable no-console */
