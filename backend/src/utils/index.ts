export const to = <T>(promise: Promise<T>) => {
  return promise.then(res => [null, res]).catch(err => [err]);
};
