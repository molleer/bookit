const to = promise => {
  return promise.then(res => [null, res]).catch(err => [err]);
};
