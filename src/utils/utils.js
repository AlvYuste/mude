export const prevent = cb => event => {
  event.preventDefault();
  if (cb && typeof cb === 'function') {
    cb(event);
  }
};

export const searchToObj = search =>
  search
    .substring(1)
    .split('&')
    .reduce((prev, curr) => {
      const p = curr.split('=');
      prev[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
      return prev;
    }, {});

export const getSearchValue = (search, key) => searchToObj(search)[key];
