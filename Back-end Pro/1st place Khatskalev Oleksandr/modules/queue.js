module.exports = function(delay) {
  const queue = [];

  const interval = setInterval(async function() {
    if (!queue.length) return;

    const task = queue.pop();
    try {
      await task();
      console.log('Queue task successfully executed');
    } catch (e) {
      console.error('Got error during queue task execution');
      console.error(e);
    }
  }.bind(this), delay);

  return {
    push: function(task) {
      queue.push(task);
    },
    stop: function() {
      clearInterval(interval);
    }
  };
};