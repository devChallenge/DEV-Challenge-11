module.exports = function(currentProcess) {
  const jobs = [];

  /**
   * Add SIGINT handler for graceful shutdown
   */
  currentProcess.on('SIGINT', function() {
    console.log('Performing graceful shutdown');
    jobs.forEach(job => job());
    currentProcess.exit(0);
  });

  /**
   * This function basically appends jobs, so can be used multiple times
   */
  return function(newJobs) {
    ([].concat(newJobs)).forEach(job => jobs.push(job));
  };
};