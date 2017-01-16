class ArityMismatchError extends Error {
  constructor(length) {
    super(`No function found with ${length} argument(s).`);
    this.name = 'ArityMismatchError';
  }
}

module.exports = {
  ArityMismatchError
};
