export const pad = (
  str,
  length = `${str}`.length,
  char = '0',
  truncate = true,
) => {
  const realLength = truncate ? length : Math.max(length, `${str}`.length);
  return `${new Array(realLength + 1).join(char)}${str}`.slice(-realLength);
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

export const getFirstDecimalPosition = rawNumber => {
  let position = 0;
  let number = Math.abs(parseFloat(`${rawNumber}`));
  while (Math.floor(number) === 0) {
    position += 1;
    number *= 10;
  }
  return position;
};
