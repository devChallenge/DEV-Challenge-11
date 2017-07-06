/**
 * This function extends object and wraps his own methods with counters, so it will be easy to use in tests
 */
function extend(obj) {
  obj.counters = {};
  
  // Take only functions of the object
  const methods = Object.keys(obj).filter(key => typeof obj[key] === 'function');

  methods.forEach(method => {
    // fill counters object
    obj.counters[method] = 0;

    // save old function
    const old = obj[method];

    // wrap old function with counter increment
    obj[method] = function() {
      this.counters[method]++;
      return old.apply(this, arguments);
    };
  });
   
  obj.resetCounters = function() {
    methods.forEach(key => {
      this.counters[key] = 0;
    });
  };
  return obj;
}

function emptyAsync() {
  return Promise.resolve();
}

module.exports.stateHandler = extend({
  registerCalls: function() {
    return [];
  },
  registerEmployee: emptyAsync,
  reset: emptyAsync,
  finishedCall: emptyAsync
});