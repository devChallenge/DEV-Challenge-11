// ID

const genId = () => Math.random().toString(36).substr(2, 24);


// Export

export default {
  id: {
    genId,
  },
};
