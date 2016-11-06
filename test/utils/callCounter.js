module.exports = returnVal => {
  let count = 0;
  const spy = () => {
    count ++;
    return returnVal;
  };
  spy.getCallCount = () => count;
  return spy;
};
