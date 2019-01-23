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

/* CLIP_SET_DURATION */
export const CLIP_UPDATE_KEY = 'CLIP_UPDATE';
export const updateClipAction = createBasicAction(CLIP_UPDATE_KEY);
export const updateClipReducer = createBasicReducer(
  CLIP_UPDATE_KEY,
  (state, { payload: { trackId, id, ...clipProps } }) =>
    R.over(clipLens(trackId, id), R.mergeDeepLeft(clipProps), state),
);
