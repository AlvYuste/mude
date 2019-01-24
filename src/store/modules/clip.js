import * as R from 'ramda';
import { lensById } from '../../utils/fp';
import { trackPropLens } from './track';
import { createBasicAction } from '../helpers/basic/basic.action';
import { createBasicReducer } from '../helpers/basic/basic.reducer';

export const clipLens = (trackId, clipId) =>
  R.compose(
    trackPropLens(trackId, 'clips'),
    lensById(clipId),
  );

/* CLIP_UPDATE */
export const CLIP_UPDATE_KEY = 'CLIP_UPDATE';
export const updateClipAction = createBasicAction(CLIP_UPDATE_KEY);
export const updateClipReducer = createBasicReducer(
  CLIP_UPDATE_KEY,
  (state, { payload: { trackId, id, ...clipProps } }) =>
    R.over(clipLens(trackId, id), R.mergeDeepLeft(clipProps), state),
);

/* CLIP_UPDATE */
export const CLIP_PUSH_BUFFER_KEY = 'CLIP_PUSH_BUFFER';
export const pushBufferClipAction = createBasicAction(CLIP_PUSH_BUFFER_KEY);
export const pushBufferClipReducer = createBasicReducer(
  CLIP_PUSH_BUFFER_KEY,
  (state, { payload: { trackId, id, buffer } }) => {
    const bufferLens = channel =>
      R.compose(
        clipLens(trackId, id),
        R.lensPath(['buffer', channel]),
      );
    const prevLBuffer = R.view(bufferLens('l'), state) || [];
    const prevRBuffer = R.view(bufferLens('r'), state) || [];
    return R.pipe(
      R.set(bufferLens('l'), [...prevLBuffer, ...buffer.l]),
      R.set(bufferLens('r'), [...prevRBuffer, ...buffer.r]),
    )(state);
  },
);
