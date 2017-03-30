const asyncWhile = (promise, action) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(action, 0);
    promise.then(data => {
      clearInterval(interval);
      resolve(data);
    }, error => {
      clearInterval(interval);
      reject(error);
    });
  });
};

module.exports = asyncWhile;