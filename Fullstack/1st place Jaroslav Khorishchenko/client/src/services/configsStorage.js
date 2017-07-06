// Config Storage
const KEY_PREFIX = 'app:';

const getFullKey = key => (KEY_PREFIX + key);

const getConfig = (key) => {
  const fullKey = getFullKey(key);
  const valStr = localStorage.getItem(fullKey);
  if (valStr === undefined) return null;
  let val = null;
  try {
    val = JSON.parse(valStr);
  } catch (e) {
    log.err(e);
    return null;
  }
  return val;
};

const setConfig = (key, val) => {
  const fullKey = getFullKey(key);
  const valStr = JSON.stringify(val);
  localStorage.setItem(fullKey, valStr);
};

export default {
  get: getConfig,
  set: setConfig,
};
