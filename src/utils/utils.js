export const prevent = cb => event => {
  event.preventDefault();
  if (cb && typeof cb === 'function') {
    cb(event);
  }
};
