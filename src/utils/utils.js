import { PIXELS_PER_TICK, TICKS_PER_SEGEMNT } from './variables';

export const prevent = cb => event => {
  event.preventDefault();
  if (cb && typeof cb === 'function') {
    cb(event);
  }
};
export const noPropagate = cb => event => {
  event.stopPropagation();
  if (cb && typeof cb === 'function') {
    cb(event);
  }
};
export const getEventRelativeCoords = (event, container = event.target) => {
  const { left, top } = container.getBoundingClientRect();
  const x = event.clientX - left;
  const y = event.clientY - top;
  return { x, y };
};
export const getTimeFromOffset = (offset, zoom = 1) =>
  Math.floor((offset / PIXELS_PER_TICK / TICKS_PER_SEGEMNT / zoom) * 1000);
export const getOffsetFromTime = (time, zoom = 1) =>
  Math.floor((time * PIXELS_PER_TICK * TICKS_PER_SEGEMNT * zoom) / 1000);

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
