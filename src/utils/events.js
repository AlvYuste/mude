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
export const preventInputs = cb => event => {
  const isInput =
    event.target.tagName === 'INPUT' ||
    event.target.tagName === 'SELECT' ||
    event.target.tagName === 'TEXTAREA' ||
    (event.target.contentEditable && event.target.contentEditable === 'true');
  if (!isInput && cb && typeof cb === 'function') {
    cb(event);
  }
};
export const getEventRelativeCoords = (event, container = event.target) => {
  const { left, top } = container.getBoundingClientRect();
  const x = event.clientX - left;
  const y = event.clientY - top;
  return { x, y };
};
