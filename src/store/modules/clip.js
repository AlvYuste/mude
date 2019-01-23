import * as R from 'ramda';
import { lensById } from '../../utils/fp';
import { trackPropLens } from './track';
import { createBasicAction } from '../helpers/basic/basic.action';
import { createBasicReducer } from '../helpers/basic/basic.reducer';
import { currentProjectLens, getCurrentProject } from './project';

export const projectClipLens = (trackId, clipId) =>
  R.compose(
    trackPropLens(trackId, 'clips'),
    lensById(clipId),
  );
export const clipLens = (trackId, clipId) =>
  R.compose(
    currentProjectLens,
    projectClipLens(trackId, clipId),
  );
/* CLIP_SET_DURATION */
export const CLIP_UPDATE_KEY = 'CLIP_UPDATE';
export const updateClipAction = createBasicAction(CLIP_UPDATE_KEY);
export const updateClipReducer = createBasicReducer(
  CLIP_UPDATE_KEY,
  (state, { payload: { trackId, id, ...clipProps } }) =>
    R.over(projectClipLens(trackId, id), R.mergeDeepLeft(clipProps), state),
);

/* CLIP_SET_DURATION */
export const setClipDurationAction = payload => (dispatch, getState) => {
  const { trackId, id, duration } = payload;
  const clip = R.view(clipLens(trackId, id), getState());
  console.log('clip:', clip);
  console.log('startAt:', clip.startAt);
  console.log('duration:', duration);
  const endAt = (clip.startAt || 0) + duration;
  dispatch({ type: CLIP_UPDATE_KEY, payload: { trackId, id, endAt } });
};
