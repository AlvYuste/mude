import * as R from 'ramda';
import { createBasicReducer } from '../helpers/basic/basic.reducer';
import { createBasicAction } from '../helpers/basic/basic.action';
import { lensById } from '../../utils/fp';

const dataLense = prop => R.lensPath(['data', prop]);
const tracksLens = dataLense('tracks');
const trackLens = trackId =>
  R.compose(
    tracksLens,
    lensById(trackId),
  );
const trackPropLens = (trackId, prop) =>
  R.compose(
    trackLens(trackId),
    Array.isArray(prop) ? R.lensPath(prop) : R.lensProp(prop),
  );

/* TRACK_UPDATE_TRACK */
export const TRACK_UPDATE_KEY = 'TRACK_UPDATE';
export const updateTrackAction = createBasicAction(TRACK_UPDATE_KEY);
export const updateTrackReducer = createBasicReducer(
  TRACK_UPDATE_KEY,
  (state, { payload }) =>
    R.over(trackLens(payload.id), R.mergeDeepLeft(payload), state),
);

/* TRACK_SET_NAME_TRACK */
export const TRACK_SET_NAME_KEY = 'TRACK_SET_NAME';
export const setTrackNameAction = createBasicAction(TRACK_SET_NAME_KEY);
export const setTrackNameReducer = createBasicReducer(
  TRACK_SET_NAME_KEY,
  (state, { payload }) =>
    R.set(trackPropLens(payload.id, 'name'), payload.value, state),
);

/* TRACK_SET_VOLUME_TRACK */
export const TRACK_SET_VOLUME_KEY = 'TRACK_SET_VOLUME';
export const setTrackVolumeAction = createBasicAction(TRACK_SET_VOLUME_KEY);
export const setTrackVolumeReducer = createBasicReducer(
  TRACK_SET_VOLUME_KEY,
  (state, { payload }) =>
    R.set(trackPropLens(payload.id, 'volume'), payload.value, state),
);

/* TRACK_SET_PAN_TRACK */
export const TRACK_SET_PAN_KEY = 'TRACK_SET_PAN';
export const setTrackPanAction = createBasicAction(TRACK_SET_PAN_KEY);
export const setTrackPanReducer = createBasicReducer(
  TRACK_SET_PAN_KEY,
  (state, { payload }) =>
    R.set(trackPropLens(payload.id, 'pan'), payload.value, state),
);

/* TRACK_DELETE_TRACK */
export const TRACK_DELETE_KEY = 'TRACK_DELETE';
export const deleteTrackAction = createBasicAction(TRACK_DELETE_KEY);
export const deleteTrackReducer = createBasicReducer(
  TRACK_DELETE_KEY,
  (state, { payload }) =>
    R.over(tracksLens, R.filter(track => track.id !== payload), state),
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