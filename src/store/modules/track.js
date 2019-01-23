import * as R from 'ramda';
import uuid from 'uuid';
import { createBasicReducer } from '../helpers/basic/basic.reducer';
import { createBasicAction } from '../helpers/basic/basic.action';
import { lensById } from '../../utils/fp';
import { getTimeSelected, getSelectedTracks } from './ui';
import { dataLens } from '../helpers/async/async.reducer';

export const trackLens = trackId =>
  R.compose(
    dataLens('tracks'),
    lensById(trackId),
  );
export const trackPropLens = (trackId, prop) =>
  R.compose(
    trackLens(trackId),
    Array.isArray(prop) ? R.lensPath(prop) : R.lensProp(prop),
  );

/* TRACK_UPDATE */
export const TRACK_UPDATE_KEY = 'TRACK_UPDATE';
export const updateTrackAction = createBasicAction(TRACK_UPDATE_KEY);
export const updateTrackReducer = createBasicReducer(
  TRACK_UPDATE_KEY,
  (state, { payload }) =>
    R.over(trackLens(payload.id), R.mergeDeepLeft(payload), state),
);

/* TRACK_SET_NAME */
export const TRACK_SET_NAME_KEY = 'TRACK_SET_NAME';
export const setTrackNameAction = createBasicAction(TRACK_SET_NAME_KEY);
export const setTrackNameReducer = createBasicReducer(
  TRACK_SET_NAME_KEY,
  (state, { payload }) =>
    R.set(trackPropLens(payload.id, 'name'), payload.value, state),
);

/* TRACK_SET_VOLUME */
export const TRACK_SET_VOLUME_KEY = 'TRACK_SET_VOLUME';
export const setTrackVolumeAction = createBasicAction(TRACK_SET_VOLUME_KEY);
export const setTrackVolumeReducer = createBasicReducer(
  TRACK_SET_VOLUME_KEY,
  (state, { payload }) =>
    R.set(trackPropLens(payload.id, 'volume'), payload.value, state),
);

/* TRACK_SET_PAN */
export const TRACK_SET_PAN_KEY = 'TRACK_SET_PAN';
export const setTrackPanAction = createBasicAction(TRACK_SET_PAN_KEY);
export const setTrackPanReducer = createBasicReducer(
  TRACK_SET_PAN_KEY,
  (state, { payload }) =>
    R.set(trackPropLens(payload.id, 'pan'), payload.value, state),
);

/* TRACK_DELETE */
export const TRACK_DELETE_KEY = 'TRACK_DELETE';
export const deleteTrackAction = createBasicAction(TRACK_DELETE_KEY);
export const deleteTrackReducer = createBasicReducer(
  TRACK_DELETE_KEY,
  (state, { payload }) =>
    R.over(dataLens('tracks'), R.filter(track => track.id !== payload), state),
);
/* TRACK_ADD_CLIP */
export const TRACK_ADD_CLIP_KEY = 'TRACK_ADD_CLIP';
export const addClipAction = payload => (dispatch, getState) =>
  dispatch({
    type: TRACK_ADD_CLIP_KEY,
    payload: {
      id: payload.id || uuid(),
      trackId: payload.trackId || getSelectedTracks(getState())[0],
      startAt: payload.startAt || getTimeSelected(getState()),
      endAt: payload.endAt || payload.startAt,
    },
  });
export const addClipReducer = createBasicReducer(
  TRACK_ADD_CLIP_KEY,
  (state, { payload: { trackId, ...clipProps } }) =>
    R.over(trackPropLens(trackId, 'clips'), R.prepend(clipProps), state),
);

/* HISTORY */

export const undoableActions = [
  TRACK_UPDATE_KEY,
  TRACK_SET_NAME_KEY,
  TRACK_SET_VOLUME_KEY,
  TRACK_SET_PAN_KEY,
  TRACK_DELETE_KEY,
];
export const groupableActions = [
  TRACK_SET_NAME_KEY,
  TRACK_SET_VOLUME_KEY,
  TRACK_SET_PAN_KEY,
];
