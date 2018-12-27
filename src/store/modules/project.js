import { lensPath, set, over, prepend } from 'ramda';
import { createAsyncAction } from '../helpers/async/async.action';
import { createAsyncReducer } from '../helpers/async/async.reducer';

const nameLense = lensPath(['data', 'name']);
const tracksLense = lensPath(['data', 'tracks']);

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
    successReducer: (state, action) => set(nameLense, action.payload, state),
  },
);
export const updateProjectNameAction = createAsyncAction({
  key: PROJECT_UPDATE_NAME_KEY,
});

/* PROJECT_ADD_TRACK */
export const PROJECT_ADD_TRACK_KEY = 'PROJECT_ADD_TRACK';
export const addTrackReducer = createAsyncReducer(PROJECT_ADD_TRACK_KEY, {
  successReducer: (state, action) =>
    over(tracksLense, prepend({ id: action.transactionId, volume: 5 }), state),
});
export const addTrackAction = createAsyncAction({
  key: PROJECT_ADD_TRACK_KEY,
});
