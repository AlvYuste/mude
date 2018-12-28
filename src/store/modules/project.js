import * as R from 'ramda';
import { createAsyncAction } from '../helpers/async/async.action';
import { createAsyncReducer } from '../helpers/async/async.reducer';
import { lensById } from '../../utils/fp';

const nameLense = R.lensPath(['data', 'name']);
const tracksLense = R.lensPath(['data', 'tracks']);
const trackLense = id =>
  R.compose(
    tracksLense,
    lensById(id),
  );

/* CURRENT_PROJECT */
export const CURRENT_PROJECT_KEY = 'CURRENT_PROJECT';
export const currentProjectReducer = createAsyncReducer(CURRENT_PROJECT_KEY);
export const currentProjectAction = createAsyncAction({
  key: CURRENT_PROJECT_KEY,
});

/* PROJECT_UPDATE_NAME */
export const PROJECT_UPDATE_NAME_KEY = 'PROJECT_UPDATE_NAME';
export const updateProjectNameReducer = createAsyncReducer(
  PROJECT_UPDATE_NAME_KEY,
  {
    successReducer: (state, action) => R.set(nameLense, action.payload, state),
  },
);
export const updateProjectNameAction = createAsyncAction({
  key: PROJECT_UPDATE_NAME_KEY,
});

/* PROJECT_UPDATE_TRACKS */
export const PROJECT_UPDATE_TRACKS_KEY = 'PROJECT_UPDATE_TRACKS';
export const updateProjectTracksReducer = createAsyncReducer(
  PROJECT_UPDATE_TRACKS_KEY,
  {
    successReducer: (state, action) =>
      R.set(tracksLense, action.payload, state),
  },
);
export const updateProjectTracksAction = createAsyncAction({
  key: PROJECT_UPDATE_TRACKS_KEY,
});

/* PROJECT_ADD_TRACK */
export const PROJECT_ADD_TRACK_KEY = 'PROJECT_ADD_TRACK';
export const addTrackReducer = createAsyncReducer(PROJECT_ADD_TRACK_KEY, {
  successReducer: (state, action) =>
    R.over(
      tracksLense,
      R.prepend({ id: action.transactionId, volume: 5 }),
      state,
    ),
});
export const addTrackAction = createAsyncAction({
  key: PROJECT_ADD_TRACK_KEY,
});

/* PROJECT_UPDATE_TRACK */
export const PROJECT_UPDATE_TRACK_KEY = 'PROJECT_UPDATE_TRACK';
export const updateTrackReducer = createAsyncReducer(PROJECT_UPDATE_TRACK_KEY, {
  successReducer: (state, action) =>
    R.over(
      trackLense(action.payload.id),
      R.mergeDeepLeft(action.payload),
      state,
    ),
});
export const updateTrackAction = createAsyncAction({
  key: PROJECT_UPDATE_TRACK_KEY,
});
