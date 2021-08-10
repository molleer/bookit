export const to = <T>(promise: Promise<T>): Promise<{ err?: any; res?: T }> => {
  return promise.then(res => ({ res })).catch(err => ({ err }));
};
