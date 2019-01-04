import * as R from 'ramda';
import { createBasicReducer } from '../helpers/basic/basic.reducer';
import { createBasicAction } from '../helpers/basic/basic.action';
import { lensById } from '../../utils/fp';

const dataLense = prop => R.lensPath(['data', prop]);
const tracksLens = dataLense('tracks');
const trackLens = id =>
  R.compose(
    tracksLens,
    lensById(id),
  );

/* TRACK_UPDATE_TRACK */
export const TRACK_UPDATE_KEY = 'TRACK_UPDATE';
export const updateTrackReducer = createBasicReducer(
  TRACK_UPDATE_KEY,
  (state, action) =>
    R.over(
      trackLens(action.payload.id),
      R.mergeDeepLeft(action.payload),
      state,
    ),
);
export const updateTrackAction = createBasicAction(TRACK_UPDATE_KEY);
