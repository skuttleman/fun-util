class ArityMismatchError extends Error {
  constructor(length) {
    super(`No function found with ${length} argument(s).`);
    this.constructor.prototype.name = 'ArityMismatchError';
  }
}

module.exports = {
  ArityMismatchError
};
