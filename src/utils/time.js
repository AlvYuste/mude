import { SEGMENT_WIDTH } from './variables';
import { pad, getFirstDecimalPosition } from './utils';

export const getPixelsPerMs = zoom => SEGMENT_WIDTH * zoom;
export const getMsPerPixel = zoom => 1 / getPixelsPerMs(zoom);

export const getFirstSegementLabel = zoom =>
  SEGMENT_WIDTH * getMsPerPixel(zoom);
export const getTimeFromOffset = (offset, zoom = 1) =>
  Math.floor(offset * getMsPerPixel(zoom) * 1000);
export const getOffsetFromTime = (time, zoom = 1) =>
  Math.floor((time * getPixelsPerMs(zoom)) / 1000);

export const renderTime = (time, zoom = 1, extraDecimals = 0) => {
  const precission =
    getFirstDecimalPosition(getFirstSegementLabel(zoom)) + extraDecimals;
  const totalSeconds = time / 1000;
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds - mins * 60;
  return mins
    ? `${mins}:${pad(secs, 2)}`
    : secs.toFixed(Math.min(3, precission));
};
